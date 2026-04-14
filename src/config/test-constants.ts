/**
 * Test Constants
 * 
 * Centralized constants for test configuration to avoid hardcoded values.
 * All magic numbers, URLs, status codes, and test data should be defined here.
 */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const TIMEOUTS = {
  SHORT: 5_000,
  MEDIUM: 10_000,
  LONG: 20_000,
  EXTRA_LONG: 30_000,
  PAGE_LOAD: 30_000,
  API_REQUEST: 10_000,
  NAVIGATION: 20_000,
} as const;

export const WAIT_STATES = {
  LOAD: 'load',
  DOM_CONTENT_LOADED: 'domcontentloaded',
  NETWORK_IDLE: 'networkidle',
} as const;

export const ROUTES = {
  AUTH: {
    LOGIN: '/web/index.php/auth/login',
    LOGOUT: '/web/index.php/auth/logout',
  },
  DASHBOARD: '/web/index.php/dashboard/index',
  PIM: {
    EMPLOYEE_LIST: '/web/index.php/pim/viewEmployeeList',
    ADD_EMPLOYEE: '/web/index.php/pim/addEmployee',
  },
  ADMIN: {
    USER_MANAGEMENT: '/web/index.php/admin/viewSystemUsers',
  },
} as const;

export const API_ENDPOINTS = {
  ADMIN: {
    USERS: '/admin/users',
  },
  PIM: {
    EMPLOYEES: '/pim/employees',
  },
} as const;

export const USER_ROLES = {
  ADMIN: {
    ID: 1,
    NAME: 'Admin',
  },
  ESS: {
    ID: 2,
    NAME: 'ESS',
  },
} as const;

export const TEST_PASSWORDS = {
  DEFAULT: 'Admin1234!',
  ESS_USER: 'Admin1234!',
} as const;

export const URL_PATTERNS = {
  DASHBOARD: /dashboard|pim|admin/,
  LOGIN: /auth\/login/,
  ADMIN_USERS: /admin\/viewSystemUsers/,
} as const;

export const ALLURE = {
  EPIC: {
    EMPLOYEE_MANAGEMENT: 'Employee Management',
    RBAC: 'RBAC',
    API_SECURITY: 'API Security',
    AUTHENTICATION: 'Authentication',
    ACCESSIBILITY: 'Accessibility',
  },
  FEATURE: {
    EMPLOYEE_LIFECYCLE: 'Employee Lifecycle',
    ADMIN_ROLE: 'Admin Role',
    ESS_ROLE_RESTRICTIONS: 'ESS Role Restrictions',
    LOGIN_FLOW: 'Login Flow',
    EMPLOYEE_CRUD_API: 'Employee CRUD API',
  },
  SEVERITY: {
    BLOCKER: 'blocker',
    CRITICAL: 'critical',
    NORMAL: 'normal',
    MINOR: 'minor',
    TRIVIAL: 'trivial',
  },
} as const;

export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'] as const;

export const UI_ELEMENTS = {
  BUTTONS: {
    ADD: 'Add',
    SAVE: 'Save',
    DELETE: 'Delete',
    CANCEL: 'Cancel',
  },
  LINKS: {
    ADMIN: 'Admin',
    PIM: 'PIM',
    DASHBOARD: 'Dashboard',
  },
} as const;
