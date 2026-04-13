import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../config/env.config';

/**
 * OrangeHRM API Client
 *
 * Authentication strategy: session cookies from storageState.
 * The Playwright `request` fixture automatically includes the session cookies
 * captured during auth setup (src/.auth/admin.json) — no separate API login needed.
 *
 * OrangeHRM's REST API v2 accepts the same session cookie the browser uses.
 * The OAuth2 server only supports AuthCode + RefreshToken grants (no password grant).
 */
export class OrangeHRMApiClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private get jsonHeaders(): Record<string, string> {
    return { 'Content-Type': 'application/json' };
  }

  /**
   * No-op — auth is handled by storageState cookies injected into the request context.
   * Kept for API compatibility with fixtures.
   */
  async authenticate(): Promise<void> {
    // Session cookies from auth.setup.ts storageState are auto-injected by Playwright.
    // Verify we can reach an authenticated endpoint.
    const response = await this.request.get(`${config.apiBaseUrl}/pim/employees?limit=1`);
    if (response.status() === 401) {
      throw new Error(
        '[API] Session not authenticated. Ensure auth.setup.ts ran successfully and storageState is configured.'
      );
    }
  }

  // ─── Employee APIs ────────────────────────────────────────────────────────

  async createEmployee(data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    employeeId?: string;
  }): Promise<{ empNumber: number; employeeId: string }> {
    const response = await this.request.post(`${config.apiBaseUrl}/pim/employees`, {
      headers: this.jsonHeaders,
      data: {
        firstName: data.firstName,
        middleName: data.middleName ?? '',
        lastName: data.lastName,
        ...(data.employeeId ? { employeeId: data.employeeId } : {}),
      },
    });
    await this.assertOk(response, 'Create Employee');
    const body = await response.json() as { data: { empNumber: number; employeeId: string } };
    return {
      empNumber: body.data.empNumber,
      employeeId: body.data.employeeId,
    };
  }

  async getEmployee(empNumber: number): Promise<Record<string, unknown>> {
    const response = await this.request.get(
      `${config.apiBaseUrl}/pim/employees/${empNumber}`
    );
    await this.assertOk(response, `Get Employee ${empNumber}`);
    const body = await response.json() as { data: Record<string, unknown> };
    return body.data;
  }

  async updateEmployee(
    empNumber: number,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const response = await this.request.put(
      `${config.apiBaseUrl}/pim/employees/${empNumber}/personal-details`,
      { headers: this.jsonHeaders, data }
    );
    await this.assertOk(response, `Update Employee ${empNumber}`);
    const body = await response.json() as { data: Record<string, unknown> };
    return body.data;
  }

  async deleteEmployee(empNumbers: number[]): Promise<void> {
    const response = await this.request.delete(`${config.apiBaseUrl}/pim/employees`, {
      headers: this.jsonHeaders,
      data: { ids: empNumbers },
    });
    await this.assertOk(response, `Delete Employees ${empNumbers.join(',')}`);
  }

  async searchEmployees(params: {
    name?: string;
    nameOrId?: string;
    employeeId?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: Record<string, unknown>[]; total: number }> {
    const query = new URLSearchParams();
    if (params.name) query.set('name', params.name);
    if (params.nameOrId) query.set('nameOrId', params.nameOrId);
    if (params.employeeId) query.set('employeeId', params.employeeId);
    query.set('limit', String(params.limit ?? 50));
    query.set('offset', String(params.offset ?? 0));

    const response = await this.request.get(
      `${config.apiBaseUrl}/pim/employees?${query.toString()}`
    );
    await this.assertOk(response, 'Search Employees');
    const body = await response.json() as { data: Record<string, unknown>[]; meta: { total: number } };
    return { data: body.data, total: body.meta.total };
  }

  // ─── User Management APIs ─────────────────────────────────────────────────

  async createSystemUser(data: {
    userRoleId: number;
    employeeId: number;
    username: string;
    password: string;
    status: boolean;
  }): Promise<number> {
    const response = await this.request.post(`${config.apiBaseUrl}/admin/users`, {
      headers: this.jsonHeaders,
      data: {
        userRoleId: data.userRoleId,
        empNumber: data.employeeId,
        username: data.username,
        password: data.password,
        status: data.status,
      },
    });
    await this.assertOk(response, 'Create System User');
    const body = await response.json() as { data: { id: number } };
    return body.data.id;
  }

  async deleteSystemUser(userId: number): Promise<void> {
    const response = await this.request.delete(`${config.apiBaseUrl}/admin/users`, {
      headers: this.jsonHeaders,
      data: { ids: [userId] },
    });
    await this.assertOk(response, `Delete User ${userId}`);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private async assertOk(response: APIResponse, operation: string): Promise<void> {
    if (!response.ok()) {
      const body = await response.text().catch(() => '(no body)');
      throw new Error(
        `[API] ${operation} failed with status ${response.status()}: ${body}`
      );
    }
  }
}
