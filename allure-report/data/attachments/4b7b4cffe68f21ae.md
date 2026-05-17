# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/accessibility/a11y.spec.ts >> Accessibility Audits >> employee list page has no critical a11y violations @a11y
- Location: tests/e2e/accessibility/a11y.spec.ts:58:7

# Error details

```
TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - heading "PIM" [level=6] [ref=e114]
        - link "Upgrade" [ref=e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e117] [cursor=pointer]: Upgrade
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125] [cursor=pointer]:
              - img "profile picture" [ref=e126]
              - paragraph [ref=e127]: manda user
              - generic [ref=e128]: 
      - navigation "Topbar Menu" [ref=e130]:
        - list [ref=e131]:
          - listitem [ref=e132] [cursor=pointer]:
            - generic [ref=e133]:
              - text: Configuration
              - generic [ref=e134]: 
          - listitem [ref=e135] [cursor=pointer]:
            - link "Employee List" [ref=e136]:
              - /url: "#"
          - listitem [ref=e137] [cursor=pointer]:
            - link "Add Employee" [ref=e138]:
              - /url: "#"
          - listitem [ref=e139] [cursor=pointer]:
            - link "Reports" [ref=e140]:
              - /url: "#"
          - button "" [ref=e142] [cursor=pointer]:
            - generic [ref=e143]: 
  - generic [ref=e144]:
    - generic [ref=e146]:
      - generic [ref=e147]:
        - generic [ref=e148]:
          - heading "Employee Information" [level=5] [ref=e150]
          - button "" [ref=e153] [cursor=pointer]:
            - generic [ref=e154]: 
        - separator [ref=e155]
        - generic [ref=e157]:
          - generic [ref=e159]:
            - generic [ref=e161]:
              - generic [ref=e163]: Employee Name
              - textbox "Type for hints..." [ref=e167]
            - generic [ref=e169]:
              - generic [ref=e171]: Employee Id
              - textbox [ref=e173]
            - generic [ref=e175]:
              - generic [ref=e177]: Employment Status
              - generic [ref=e180] [cursor=pointer]:
                - generic [ref=e181]: "-- Select --"
                - generic [ref=e183]: 
            - generic [ref=e185]:
              - generic [ref=e187]: Include
              - generic [ref=e190] [cursor=pointer]:
                - generic [ref=e191]: Current Employees Only
                - generic [ref=e193]: 
            - generic [ref=e195]:
              - generic [ref=e197]: Supervisor Name
              - textbox "Type for hints..." [ref=e201]
            - generic [ref=e203]:
              - generic [ref=e205]: Job Title
              - generic [ref=e208] [cursor=pointer]:
                - generic [ref=e209]: "-- Select --"
                - generic [ref=e211]: 
            - generic [ref=e213]:
              - generic [ref=e215]: Sub Unit
              - generic [ref=e218] [cursor=pointer]:
                - generic [ref=e219]: "-- Select --"
                - generic [ref=e221]: 
          - separator [ref=e222]
          - generic [ref=e223]:
            - button "Reset" [ref=e224] [cursor=pointer]
            - button "Search" [ref=e225] [cursor=pointer]
      - generic [ref=e226]:
        - button " Add" [ref=e228] [cursor=pointer]:
          - generic [ref=e229]: 
          - text: Add
        - generic [ref=e230]:
          - separator [ref=e231]
          - generic [ref=e233]: (42) Records Found
        - table [ref=e235]:
          - rowgroup [ref=e236]:
            - row " Id  First (& Middle) Name  Last Name  Job Title  Employment Status  Sub Unit  Supervisor  Actions" [ref=e237]:
              - columnheader "" [ref=e238]:
                - generic [ref=e240] [cursor=pointer]:
                  - checkbox "" [ref=e241]
                  - generic [ref=e243]: 
              - columnheader "Id " [ref=e244]:
                - text: Id
                - generic [ref=e245]:
                  - generic [ref=e246] [cursor=pointer]: 
                  - text:  
              - columnheader "First (& Middle) Name " [ref=e247]:
                - text: First (& Middle) Name
                - generic [ref=e248]:
                  - generic [ref=e249] [cursor=pointer]: 
                  - text:  
              - columnheader "Last Name " [ref=e250]:
                - text: Last Name
                - generic [ref=e251]:
                  - generic [ref=e252] [cursor=pointer]: 
                  - text:  
              - columnheader "Job Title " [ref=e253]:
                - text: Job Title
                - generic [ref=e254]:
                  - generic [ref=e255] [cursor=pointer]: 
                  - text:  
              - columnheader "Employment Status " [ref=e256]:
                - text: Employment Status
                - generic [ref=e257]:
                  - generic [ref=e258] [cursor=pointer]: 
                  - text:  
              - columnheader "Sub Unit " [ref=e259]:
                - text: Sub Unit
                - generic [ref=e260]:
                  - generic [ref=e261] [cursor=pointer]: 
                  - text:  
              - columnheader "Supervisor " [ref=e262]:
                - text: Supervisor
                - generic [ref=e263]:
                  - generic [ref=e264] [cursor=pointer]: 
                  - text:  
              - columnheader "Actions" [ref=e265]
          - rowgroup [ref=e266]:
            - row " 0404 abcd bc bgh  " [ref=e268] [cursor=pointer]:
              - cell "" [ref=e269]:
                - generic [ref=e272]:
                  - checkbox "" [ref=e273]
                  - generic [ref=e275]: 
              - cell "0404" [ref=e276]:
                - generic [ref=e277]: "0404"
              - cell "abcd bc" [ref=e278]:
                - generic [ref=e279]: abcd bc
              - cell "bgh" [ref=e280]:
                - generic [ref=e281]: bgh
              - cell [ref=e282]
              - cell [ref=e283]
              - cell [ref=e284]
              - cell [ref=e285]
              - cell " " [ref=e286]:
                - generic [ref=e287]:
                  - button "" [ref=e288]:
                    - generic [ref=e289]: 
                  - button "" [ref=e290]:
                    - generic [ref=e291]: 
            - row " 464 aniket Ashok patil  " [ref=e293] [cursor=pointer]:
              - cell "" [ref=e294]:
                - generic [ref=e297]:
                  - checkbox "" [ref=e298]
                  - generic [ref=e300]: 
              - cell "464" [ref=e301]:
                - generic [ref=e302]: "464"
              - cell "aniket Ashok" [ref=e303]:
                - generic [ref=e304]: aniket Ashok
              - cell "patil" [ref=e305]:
                - generic [ref=e306]: patil
              - cell [ref=e307]
              - cell [ref=e308]
              - cell [ref=e309]
              - cell [ref=e310]
              - cell " " [ref=e311]:
                - generic [ref=e312]:
                  - button "" [ref=e313]:
                    - generic [ref=e314]: 
                  - button "" [ref=e315]:
                    - generic [ref=e316]: 
            - row " 0419 CalibreQA 1778996512976  " [ref=e318] [cursor=pointer]:
              - cell "" [ref=e319]:
                - generic [ref=e322]:
                  - checkbox "" [ref=e323]
                  - generic [ref=e325]: 
              - cell "0419" [ref=e326]:
                - generic [ref=e327]: "0419"
              - cell "CalibreQA" [ref=e328]:
                - generic [ref=e329]: CalibreQA
              - cell "1778996512976" [ref=e330]:
                - generic [ref=e331]: "1778996512976"
              - cell [ref=e332]
              - cell [ref=e333]
              - cell [ref=e334]
              - cell [ref=e335]
              - cell " " [ref=e336]:
                - generic [ref=e337]:
                  - button "" [ref=e338]:
                    - generic [ref=e339]: 
                  - button "" [ref=e340]:
                    - generic [ref=e341]: 
            - row " Dannie Schoen  " [ref=e343] [cursor=pointer]:
              - cell "" [ref=e344]:
                - generic [ref=e347]:
                  - checkbox "" [ref=e348]
                  - generic [ref=e350]: 
              - cell [ref=e351]
              - cell "Dannie" [ref=e352]:
                - generic [ref=e353]: Dannie
              - cell "Schoen" [ref=e354]:
                - generic [ref=e355]: Schoen
              - cell [ref=e356]
              - cell [ref=e357]
              - cell [ref=e358]
              - cell [ref=e359]
              - cell " " [ref=e360]:
                - generic [ref=e361]:
                  - button "" [ref=e362]:
                    - generic [ref=e363]: 
                  - button "" [ref=e364]:
                    - generic [ref=e365]: 
            - row " 0409 Duplicate Test  " [ref=e367] [cursor=pointer]:
              - cell "" [ref=e368]:
                - generic [ref=e371]:
                  - checkbox "" [ref=e372]
                  - generic [ref=e374]: 
              - cell "0409" [ref=e375]:
                - generic [ref=e376]: "0409"
              - cell "Duplicate" [ref=e377]:
                - generic [ref=e378]: Duplicate
              - cell "Test" [ref=e379]:
                - generic [ref=e380]: Test
              - cell [ref=e381]
              - cell [ref=e382]
              - cell [ref=e383]
              - cell [ref=e384]
              - cell " " [ref=e385]:
                - generic [ref=e386]:
                  - button "" [ref=e387]:
                    - generic [ref=e388]: 
                  - button "" [ref=e389]:
                    - generic [ref=e390]: 
            - row " 0407 Gaurav no Ingle  " [ref=e392] [cursor=pointer]:
              - cell "" [ref=e393]:
                - generic [ref=e396]:
                  - checkbox "" [ref=e397]
                  - generic [ref=e399]: 
              - cell "0407" [ref=e400]:
                - generic [ref=e401]: "0407"
              - cell "Gaurav no" [ref=e402]:
                - generic [ref=e403]: Gaurav no
              - cell "Ingle" [ref=e404]:
                - generic [ref=e405]: Ingle
              - cell [ref=e406]
              - cell [ref=e407]
              - cell [ref=e408]
              - cell [ref=e409]
              - cell " " [ref=e410]:
                - generic [ref=e411]:
                  - button "" [ref=e412]:
                    - generic [ref=e413]: 
                  - button "" [ref=e414]:
                    - generic [ref=e415]: 
            - row " 5896 Hettie Gulgowski  " [ref=e417] [cursor=pointer]:
              - cell "" [ref=e418]:
                - generic [ref=e421]:
                  - checkbox "" [ref=e422]
                  - generic [ref=e424]: 
              - cell "5896" [ref=e425]:
                - generic [ref=e426]: "5896"
              - cell "Hettie" [ref=e427]:
                - generic [ref=e428]: Hettie
              - cell "Gulgowski" [ref=e429]:
                - generic [ref=e430]: Gulgowski
              - cell [ref=e431]
              - cell [ref=e432]
              - cell [ref=e433]
              - cell [ref=e434]
              - cell " " [ref=e435]:
                - generic [ref=e436]:
                  - button "" [ref=e437]:
                    - generic [ref=e438]: 
                  - button "" [ref=e439]:
                    - generic [ref=e440]: 
            - row " 8701 Irma Brown  " [ref=e442] [cursor=pointer]:
              - cell "" [ref=e443]:
                - generic [ref=e446]:
                  - checkbox "" [ref=e447]
                  - generic [ref=e449]: 
              - cell "8701" [ref=e450]:
                - generic [ref=e451]: "8701"
              - cell "Irma" [ref=e452]:
                - generic [ref=e453]: Irma
              - cell "Brown" [ref=e454]:
                - generic [ref=e455]: Brown
              - cell [ref=e456]
              - cell [ref=e457]
              - cell [ref=e458]
              - cell [ref=e459]
              - cell " " [ref=e460]:
                - generic [ref=e461]:
                  - button "" [ref=e462]:
                    - generic [ref=e463]: 
                  - button "" [ref=e464]:
                    - generic [ref=e465]: 
            - row " 813115 Jane Marie Smith  " [ref=e467] [cursor=pointer]:
              - cell "" [ref=e468]:
                - generic [ref=e471]:
                  - checkbox "" [ref=e472]
                  - generic [ref=e474]: 
              - cell "813115" [ref=e475]:
                - generic [ref=e476]: "813115"
              - cell "Jane Marie" [ref=e477]:
                - generic [ref=e478]: Jane Marie
              - cell "Smith" [ref=e479]:
                - generic [ref=e480]: Smith
              - cell [ref=e481]
              - cell [ref=e482]
              - cell [ref=e483]
              - cell [ref=e484]
              - cell " " [ref=e485]:
                - generic [ref=e486]:
                  - button "" [ref=e487]:
                    - generic [ref=e488]: 
                  - button "" [ref=e489]:
                    - generic [ref=e490]: 
            - row " 0423 John Doe  " [ref=e492] [cursor=pointer]:
              - cell "" [ref=e493]:
                - generic [ref=e496]:
                  - checkbox "" [ref=e497]
                  - generic [ref=e499]: 
              - cell "0423" [ref=e500]:
                - generic [ref=e501]: "0423"
              - cell "John" [ref=e502]:
                - generic [ref=e503]: John
              - cell "Doe" [ref=e504]:
                - generic [ref=e505]: Doe
              - cell [ref=e506]
              - cell [ref=e507]
              - cell [ref=e508]
              - cell [ref=e509]
              - cell " " [ref=e510]:
                - generic [ref=e511]:
                  - button "" [ref=e512]:
                    - generic [ref=e513]: 
                  - button "" [ref=e514]:
                    - generic [ref=e515]: 
            - row " 0421 John Doe  " [ref=e517] [cursor=pointer]:
              - cell "" [ref=e518]:
                - generic [ref=e521]:
                  - checkbox "" [ref=e522]
                  - generic [ref=e524]: 
              - cell "0421" [ref=e525]:
                - generic [ref=e526]: "0421"
              - cell "John" [ref=e527]:
                - generic [ref=e528]: John
              - cell "Doe" [ref=e529]:
                - generic [ref=e530]: Doe
              - cell [ref=e531]
              - cell [ref=e532]
              - cell [ref=e533]
              - cell [ref=e534]
              - cell " " [ref=e535]:
                - generic [ref=e536]:
                  - button "" [ref=e537]:
                    - generic [ref=e538]: 
                  - button "" [ref=e539]:
                    - generic [ref=e540]: 
            - row " 0420 John Doe  " [ref=e542] [cursor=pointer]:
              - cell "" [ref=e543]:
                - generic [ref=e546]:
                  - checkbox "" [ref=e547]
                  - generic [ref=e549]: 
              - cell "0420" [ref=e550]:
                - generic [ref=e551]: "0420"
              - cell "John" [ref=e552]:
                - generic [ref=e553]: John
              - cell "Doe" [ref=e554]:
                - generic [ref=e555]: Doe
              - cell [ref=e556]
              - cell [ref=e557]
              - cell [ref=e558]
              - cell [ref=e559]
              - cell " " [ref=e560]:
                - generic [ref=e561]:
                  - button "" [ref=e562]:
                    - generic [ref=e563]: 
                  - button "" [ref=e564]:
                    - generic [ref=e565]: 
            - row " 0408 John Michael Doe  " [ref=e567] [cursor=pointer]:
              - cell "" [ref=e568]:
                - generic [ref=e571]:
                  - checkbox "" [ref=e572]
                  - generic [ref=e574]: 
              - cell "0408" [ref=e575]:
                - generic [ref=e576]: "0408"
              - cell "John Michael" [ref=e577]:
                - generic [ref=e578]: John Michael
              - cell "Doe" [ref=e579]:
                - generic [ref=e580]: Doe
              - cell [ref=e581]
              - cell [ref=e582]
              - cell [ref=e583]
              - cell [ref=e584]
              - cell " " [ref=e585]:
                - generic [ref=e586]:
                  - button "" [ref=e587]:
                    - generic [ref=e588]: 
                  - button "" [ref=e589]:
                    - generic [ref=e590]: 
            - row " 803816 John Quincy Doe  " [ref=e592] [cursor=pointer]:
              - cell "" [ref=e593]:
                - generic [ref=e596]:
                  - checkbox "" [ref=e597]
                  - generic [ref=e599]: 
              - cell "803816" [ref=e600]:
                - generic [ref=e601]: "803816"
              - cell "John Quincy" [ref=e602]:
                - generic [ref=e603]: John Quincy
              - cell "Doe" [ref=e604]:
                - generic [ref=e605]: Doe
              - cell [ref=e606]
              - cell [ref=e607]
              - cell [ref=e608]
              - cell [ref=e609]
              - cell " " [ref=e610]:
                - generic [ref=e611]:
                  - button "" [ref=e612]:
                    - generic [ref=e613]: 
                  - button "" [ref=e614]:
                    - generic [ref=e615]: 
            - row " Mallie Rory Gorczany  " [ref=e617] [cursor=pointer]:
              - cell "" [ref=e618]:
                - generic [ref=e621]:
                  - checkbox "" [ref=e622]
                  - generic [ref=e624]: 
              - cell [ref=e625]
              - cell "Mallie Rory" [ref=e626]:
                - generic [ref=e627]: Mallie Rory
              - cell "Gorczany" [ref=e628]:
                - generic [ref=e629]: Gorczany
              - cell [ref=e630]
              - cell [ref=e631]
              - cell [ref=e632]
              - cell [ref=e633]
              - cell " " [ref=e634]:
                - generic [ref=e635]:
                  - button "" [ref=e636]:
                    - generic [ref=e637]: 
                  - button "" [ref=e638]:
                    - generic [ref=e639]: 
            - row " muser manda akhil user HR Manager Full-Time Permanent Human Resources " [ref=e641] [cursor=pointer]:
              - cell "" [ref=e642]:
                - generic [ref=e646]:
                  - checkbox "" [ref=e647]
                  - generic [ref=e649]: 
              - cell "muser" [ref=e650]:
                - generic [ref=e651]: muser
              - cell "manda akhil" [ref=e652]:
                - generic [ref=e653]: manda akhil
              - cell "user" [ref=e654]:
                - generic [ref=e655]: user
              - cell "HR Manager" [ref=e656]:
                - generic [ref=e657]: HR Manager
              - cell "Full-Time Permanent" [ref=e658]:
                - generic [ref=e659]: Full-Time Permanent
              - cell "Human Resources" [ref=e660]:
                - generic [ref=e661]: Human Resources
              - cell [ref=e662]
              - cell "" [ref=e663]:
                - button "" [ref=e665]:
                  - generic [ref=e666]: 
            - row " Maudie Micah Wisozk  " [ref=e668] [cursor=pointer]:
              - cell "" [ref=e669]:
                - generic [ref=e672]:
                  - checkbox "" [ref=e673]
                  - generic [ref=e675]: 
              - cell [ref=e676]
              - cell "Maudie Micah" [ref=e677]:
                - generic [ref=e678]: Maudie Micah
              - cell "Wisozk" [ref=e679]:
                - generic [ref=e680]: Wisozk
              - cell [ref=e681]
              - cell [ref=e682]
              - cell [ref=e683]
              - cell [ref=e684]
              - cell " " [ref=e685]:
                - generic [ref=e686]:
                  - button "" [ref=e687]:
                    - generic [ref=e688]: 
                  - button "" [ref=e689]:
                    - generic [ref=e690]: 
            - row " 1750 Real test  " [ref=e692] [cursor=pointer]:
              - cell "" [ref=e693]:
                - generic [ref=e696]:
                  - checkbox "" [ref=e697]
                  - generic [ref=e699]: 
              - cell "1750" [ref=e700]:
                - generic [ref=e701]: "1750"
              - cell "Real" [ref=e702]:
                - generic [ref=e703]: Real
              - cell "test" [ref=e704]:
                - generic [ref=e705]: test
              - cell [ref=e706]
              - cell [ref=e707]
              - cell [ref=e708]
              - cell [ref=e709]
              - cell " " [ref=e710]:
                - generic [ref=e711]:
                  - button "" [ref=e712]:
                    - generic [ref=e713]: 
                  - button "" [ref=e714]:
                    - generic [ref=e715]: 
            - row " 822361 Robert James Brown  " [ref=e717] [cursor=pointer]:
              - cell "" [ref=e718]:
                - generic [ref=e721]:
                  - checkbox "" [ref=e722]
                  - generic [ref=e724]: 
              - cell "822361" [ref=e725]:
                - generic [ref=e726]: "822361"
              - cell "Robert James" [ref=e727]:
                - generic [ref=e728]: Robert James
              - cell "Brown" [ref=e729]:
                - generic [ref=e730]: Brown
              - cell [ref=e731]
              - cell [ref=e732]
              - cell [ref=e733]
              - cell [ref=e734]
              - cell " " [ref=e735]:
                - generic [ref=e736]:
                  - button "" [ref=e737]:
                    - generic [ref=e738]: 
                  - button "" [ref=e739]:
                    - generic [ref=e740]: 
            - row " Seamus Keebler  " [ref=e742] [cursor=pointer]:
              - cell "" [ref=e743]:
                - generic [ref=e746]:
                  - checkbox "" [ref=e747]
                  - generic [ref=e749]: 
              - cell [ref=e750]
              - cell "Seamus" [ref=e751]:
                - generic [ref=e752]: Seamus
              - cell "Keebler" [ref=e753]:
                - generic [ref=e754]: Keebler
              - cell [ref=e755]
              - cell [ref=e756]
              - cell [ref=e757]
              - cell [ref=e758]
              - cell " " [ref=e759]:
                - generic [ref=e760]:
                  - button "" [ref=e761]:
                    - generic [ref=e762]: 
                  - button "" [ref=e763]:
                    - generic [ref=e764]: 
            - row " 6096 Shirley Feest  " [ref=e766] [cursor=pointer]:
              - cell "" [ref=e767]:
                - generic [ref=e770]:
                  - checkbox "" [ref=e771]
                  - generic [ref=e773]: 
              - cell "6096" [ref=e774]:
                - generic [ref=e775]: "6096"
              - cell "Shirley" [ref=e776]:
                - generic [ref=e777]: Shirley
              - cell "Feest" [ref=e778]:
                - generic [ref=e779]: Feest
              - cell [ref=e780]
              - cell [ref=e781]
              - cell [ref=e782]
              - cell [ref=e783]
              - cell " " [ref=e784]:
                - generic [ref=e785]:
                  - button "" [ref=e786]:
                    - generic [ref=e787]: 
                  - button "" [ref=e788]:
                    - generic [ref=e789]: 
            - row " 0413 test auto employee  " [ref=e791] [cursor=pointer]:
              - cell "" [ref=e792]:
                - generic [ref=e795]:
                  - checkbox "" [ref=e796]
                  - generic [ref=e798]: 
              - cell "0413" [ref=e799]:
                - generic [ref=e800]: "0413"
              - cell "test auto" [ref=e801]:
                - generic [ref=e802]: test auto
              - cell "employee" [ref=e803]:
                - generic [ref=e804]: employee
              - cell [ref=e805]
              - cell [ref=e806]
              - cell [ref=e807]
              - cell [ref=e808]
              - cell " " [ref=e809]:
                - generic [ref=e810]:
                  - button "" [ref=e811]:
                    - generic [ref=e812]: 
                  - button "" [ref=e813]:
                    - generic [ref=e814]: 
            - row " 0424 TestEmpN2 LastN2  " [ref=e816] [cursor=pointer]:
              - cell "" [ref=e817]:
                - generic [ref=e820]:
                  - checkbox "" [ref=e821]
                  - generic [ref=e823]: 
              - cell "0424" [ref=e824]:
                - generic [ref=e825]: "0424"
              - cell "TestEmpN2" [ref=e826]:
                - generic [ref=e827]: TestEmpN2
              - cell "LastN2" [ref=e828]:
                - generic [ref=e829]: LastN2
              - cell [ref=e830]
              - cell [ref=e831]
              - cell [ref=e832]
              - cell [ref=e833]
              - cell " " [ref=e834]:
                - generic [ref=e835]:
                  - button "" [ref=e836]:
                    - generic [ref=e837]: 
                  - button "" [ref=e838]:
                    - generic [ref=e839]: 
            - row " 0422 TestEmpN2 LastN2  " [ref=e841] [cursor=pointer]:
              - cell "" [ref=e842]:
                - generic [ref=e845]:
                  - checkbox "" [ref=e846]
                  - generic [ref=e848]: 
              - cell "0422" [ref=e849]:
                - generic [ref=e850]: "0422"
              - cell "TestEmpN2" [ref=e851]:
                - generic [ref=e852]: TestEmpN2
              - cell "LastN2" [ref=e853]:
                - generic [ref=e854]: LastN2
              - cell [ref=e855]
              - cell [ref=e856]
              - cell [ref=e857]
              - cell [ref=e858]
              - cell " " [ref=e859]:
                - generic [ref=e860]:
                  - button "" [ref=e861]:
                    - generic [ref=e862]: 
                  - button "" [ref=e863]:
                    - generic [ref=e864]: 
            - row " 0428 TestUser_SAyL4 Automation_QvEp0  " [ref=e866] [cursor=pointer]:
              - cell "" [ref=e867]:
                - generic [ref=e870]:
                  - checkbox "" [ref=e871]
                  - generic [ref=e873]: 
              - cell "0428" [ref=e874]:
                - generic [ref=e875]: "0428"
              - cell "TestUser_SAyL4" [ref=e876]:
                - generic [ref=e877]: TestUser_SAyL4
              - cell "Automation_QvEp0" [ref=e878]:
                - generic [ref=e879]: Automation_QvEp0
              - cell [ref=e880]
              - cell [ref=e881]
              - cell [ref=e882]
              - cell [ref=e883]
              - cell " " [ref=e884]:
                - generic [ref=e885]:
                  - button "" [ref=e886]:
                    - generic [ref=e887]: 
                  - button "" [ref=e888]:
                    - generic [ref=e889]: 
            - row " 0279 uehwadquzwuehwadquzw hzzdyzwxmwhzzdyzwxmw  " [ref=e891] [cursor=pointer]:
              - cell "" [ref=e892]:
                - generic [ref=e895]:
                  - checkbox "" [ref=e896]
                  - generic [ref=e898]: 
              - cell "0279" [ref=e899]:
                - generic [ref=e900]: "0279"
              - cell "uehwadquzwuehwadquzw" [ref=e901]:
                - generic [ref=e902]: uehwadquzwuehwadquzw
              - cell "hzzdyzwxmwhzzdyzwxmw" [ref=e903]:
                - generic [ref=e904]: hzzdyzwxmwhzzdyzwxmw
              - cell [ref=e905]
              - cell [ref=e906]
              - cell [ref=e907]
              - cell [ref=e908]
              - cell " " [ref=e909]:
                - generic [ref=e910]:
                  - button "" [ref=e911]:
                    - generic [ref=e912]: 
                  - button "" [ref=e913]:
                    - generic [ref=e914]: 
            - row " 0273 Urvi Sri  " [ref=e916] [cursor=pointer]:
              - cell "" [ref=e917]:
                - generic [ref=e920]:
                  - checkbox "" [ref=e921]
                  - generic [ref=e923]: 
              - cell "0273" [ref=e924]:
                - generic [ref=e925]: "0273"
              - cell "Urvi" [ref=e926]:
                - generic [ref=e927]: Urvi
              - cell "Sri" [ref=e928]:
                - generic [ref=e929]: Sri
              - cell [ref=e930]
              - cell [ref=e931]
              - cell [ref=e932]
              - cell [ref=e933]
              - cell " " [ref=e934]:
                - generic [ref=e935]:
                  - button "" [ref=e936]:
                    - generic [ref=e937]: 
                  - button "" [ref=e938]:
                    - generic [ref=e939]: 
            - row " 0285 Urvi Sri  " [ref=e941] [cursor=pointer]:
              - cell "" [ref=e942]:
                - generic [ref=e945]:
                  - checkbox "" [ref=e946]
                  - generic [ref=e948]: 
              - cell "0285" [ref=e949]:
                - generic [ref=e950]: "0285"
              - cell "Urvi" [ref=e951]:
                - generic [ref=e952]: Urvi
              - cell "Sri" [ref=e953]:
                - generic [ref=e954]: Sri
              - cell [ref=e955]
              - cell [ref=e956]
              - cell [ref=e957]
              - cell [ref=e958]
              - cell " " [ref=e959]:
                - generic [ref=e960]:
                  - button "" [ref=e961]:
                    - generic [ref=e962]: 
                  - button "" [ref=e963]:
                    - generic [ref=e964]: 
            - row " 0284 Urvi Sri  " [ref=e966] [cursor=pointer]:
              - cell "" [ref=e967]:
                - generic [ref=e970]:
                  - checkbox "" [ref=e971]
                  - generic [ref=e973]: 
              - cell "0284" [ref=e974]:
                - generic [ref=e975]: "0284"
              - cell "Urvi" [ref=e976]:
                - generic [ref=e977]: Urvi
              - cell "Sri" [ref=e978]:
                - generic [ref=e979]: Sri
              - cell [ref=e980]
              - cell [ref=e981]
              - cell [ref=e982]
              - cell [ref=e983]
              - cell " " [ref=e984]:
                - generic [ref=e985]:
                  - button "" [ref=e986]:
                    - generic [ref=e987]: 
                  - button "" [ref=e988]:
                    - generic [ref=e989]: 
            - row " 0281 Urvi Sri  " [ref=e991] [cursor=pointer]:
              - cell "" [ref=e992]:
                - generic [ref=e995]:
                  - checkbox "" [ref=e996]
                  - generic [ref=e998]: 
              - cell "0281" [ref=e999]:
                - generic [ref=e1000]: "0281"
              - cell "Urvi" [ref=e1001]:
                - generic [ref=e1002]: Urvi
              - cell "Sri" [ref=e1003]:
                - generic [ref=e1004]: Sri
              - cell [ref=e1005]
              - cell [ref=e1006]
              - cell [ref=e1007]
              - cell [ref=e1008]
              - cell " " [ref=e1009]:
                - generic [ref=e1010]:
                  - button "" [ref=e1011]:
                    - generic [ref=e1012]: 
                  - button "" [ref=e1013]:
                    - generic [ref=e1014]: 
            - row " 0280 Urvi Sri  " [ref=e1016] [cursor=pointer]:
              - cell "" [ref=e1017]:
                - generic [ref=e1020]:
                  - checkbox "" [ref=e1021]
                  - generic [ref=e1023]: 
              - cell "0280" [ref=e1024]:
                - generic [ref=e1025]: "0280"
              - cell "Urvi" [ref=e1026]:
                - generic [ref=e1027]: Urvi
              - cell "Sri" [ref=e1028]:
                - generic [ref=e1029]: Sri
              - cell [ref=e1030]
              - cell [ref=e1031]
              - cell [ref=e1032]
              - cell [ref=e1033]
              - cell " " [ref=e1034]:
                - generic [ref=e1035]:
                  - button "" [ref=e1036]:
                    - generic [ref=e1037]: 
                  - button "" [ref=e1038]:
                    - generic [ref=e1039]: 
            - row " 0274 Urvi Sri  " [ref=e1041] [cursor=pointer]:
              - cell "" [ref=e1042]:
                - generic [ref=e1045]:
                  - checkbox "" [ref=e1046]
                  - generic [ref=e1048]: 
              - cell "0274" [ref=e1049]:
                - generic [ref=e1050]: "0274"
              - cell "Urvi" [ref=e1051]:
                - generic [ref=e1052]: Urvi
              - cell "Sri" [ref=e1053]:
                - generic [ref=e1054]: Sri
              - cell [ref=e1055]
              - cell [ref=e1056]
              - cell [ref=e1057]
              - cell [ref=e1058]
              - cell " " [ref=e1059]:
                - generic [ref=e1060]:
                  - button "" [ref=e1061]:
                    - generic [ref=e1062]: 
                  - button "" [ref=e1063]:
                    - generic [ref=e1064]: 
            - row " 0249 Virat Kohli  " [ref=e1066] [cursor=pointer]:
              - cell "" [ref=e1067]:
                - generic [ref=e1070]:
                  - checkbox "" [ref=e1071]
                  - generic [ref=e1073]: 
              - cell "0249" [ref=e1074]:
                - generic [ref=e1075]: "0249"
              - cell "Virat" [ref=e1076]:
                - generic [ref=e1077]: Virat
              - cell "Kohli" [ref=e1078]:
                - generic [ref=e1079]: Kohli
              - cell [ref=e1080]
              - cell [ref=e1081]
              - cell [ref=e1082]
              - cell [ref=e1083]
              - cell " " [ref=e1084]:
                - generic [ref=e1085]:
                  - button "" [ref=e1086]:
                    - generic [ref=e1087]: 
                  - button "" [ref=e1088]:
                    - generic [ref=e1089]: 
            - row " 09876 yedghjb1 ru84 90jsnd  " [ref=e1091] [cursor=pointer]:
              - cell "" [ref=e1092]:
                - generic [ref=e1095]:
                  - checkbox "" [ref=e1096]
                  - generic [ref=e1098]: 
              - cell "09876" [ref=e1099]:
                - generic [ref=e1100]: "09876"
              - cell "yedghjb1 ru84" [ref=e1101]:
                - generic [ref=e1102]: yedghjb1 ru84
              - cell "90jsnd" [ref=e1103]:
                - generic [ref=e1104]: 90jsnd
              - cell [ref=e1105]
              - cell [ref=e1106]
              - cell [ref=e1107]
              - cell [ref=e1108]
              - cell " " [ref=e1109]:
                - generic [ref=e1110]:
                  - button "" [ref=e1111]:
                    - generic [ref=e1112]: 
                  - button "" [ref=e1113]:
                    - generic [ref=e1114]: 
            - row " 0311 yqlluQZYFR yaTQBtZgLf  " [ref=e1116] [cursor=pointer]:
              - cell "" [ref=e1117]:
                - generic [ref=e1120]:
                  - checkbox "" [ref=e1121]
                  - generic [ref=e1123]: 
              - cell "0311" [ref=e1124]:
                - generic [ref=e1125]: "0311"
              - cell "yqlluQZYFR" [ref=e1126]:
                - generic [ref=e1127]: yqlluQZYFR
              - cell "yaTQBtZgLf" [ref=e1128]:
                - generic [ref=e1129]: yaTQBtZgLf
              - cell [ref=e1130]
              - cell [ref=e1131]
              - cell [ref=e1132]
              - cell [ref=e1133]
              - cell " " [ref=e1134]:
                - generic [ref=e1135]:
                  - button "" [ref=e1136]:
                    - generic [ref=e1137]: 
                  - button "" [ref=e1138]:
                    - generic [ref=e1139]: 
            - row " Zelda Koelpin  " [ref=e1141] [cursor=pointer]:
              - cell "" [ref=e1142]:
                - generic [ref=e1145]:
                  - checkbox "" [ref=e1146]
                  - generic [ref=e1148]: 
              - cell [ref=e1149]
              - cell "Zelda" [ref=e1150]:
                - generic [ref=e1151]: Zelda
              - cell "Koelpin" [ref=e1152]:
                - generic [ref=e1153]: Koelpin
              - cell [ref=e1154]
              - cell [ref=e1155]
              - cell [ref=e1156]
              - cell [ref=e1157]
              - cell " " [ref=e1158]:
                - generic [ref=e1159]:
                  - button "" [ref=e1160]:
                    - generic [ref=e1161]: 
                  - button "" [ref=e1162]:
                    - generic [ref=e1163]: 
            - row " 0259 zlnudvgazrzlnudvgazr smzocpbvswsmzocpbvsw  " [ref=e1165] [cursor=pointer]:
              - cell "" [ref=e1166]:
                - generic [ref=e1169]:
                  - checkbox "" [ref=e1170]
                  - generic [ref=e1172]: 
              - cell "0259" [ref=e1173]:
                - generic [ref=e1174]: "0259"
              - cell "zlnudvgazrzlnudvgazr" [ref=e1175]:
                - generic [ref=e1176]: zlnudvgazrzlnudvgazr
              - cell "smzocpbvswsmzocpbvsw" [ref=e1177]:
                - generic [ref=e1178]: smzocpbvswsmzocpbvsw
              - cell [ref=e1179]
              - cell [ref=e1180]
              - cell [ref=e1181]
              - cell [ref=e1182]
              - cell " " [ref=e1183]:
                - generic [ref=e1184]:
                  - button "" [ref=e1185]:
                    - generic [ref=e1186]: 
                  - button "" [ref=e1187]:
                    - generic [ref=e1188]: 
            - row " 0396 测试 已修改 员工  " [ref=e1190] [cursor=pointer]:
              - cell "" [ref=e1191]:
                - generic [ref=e1194]:
                  - checkbox "" [ref=e1195]
                  - generic [ref=e1197]: 
              - cell "0396" [ref=e1198]:
                - generic [ref=e1199]: "0396"
              - cell "测试 已修改" [ref=e1200]:
                - generic [ref=e1201]: 测试 已修改
              - cell "员工" [ref=e1202]:
                - generic [ref=e1203]: 员工
              - cell [ref=e1204]
              - cell [ref=e1205]
              - cell [ref=e1206]
              - cell [ref=e1207]
              - cell " " [ref=e1208]:
                - generic [ref=e1209]:
                  - button "" [ref=e1210]:
                    - generic [ref=e1211]: 
                  - button "" [ref=e1212]:
                    - generic [ref=e1213]: 
            - row " 0394 测试 员工  " [ref=e1215] [cursor=pointer]:
              - cell "" [ref=e1216]:
                - generic [ref=e1219]:
                  - checkbox "" [ref=e1220]
                  - generic [ref=e1222]: 
              - cell "0394" [ref=e1223]:
                - generic [ref=e1224]: "0394"
              - cell "测试" [ref=e1225]:
                - generic [ref=e1226]: 测试
              - cell "员工" [ref=e1227]:
                - generic [ref=e1228]: 员工
              - cell [ref=e1229]
              - cell [ref=e1230]
              - cell [ref=e1231]
              - cell [ref=e1232]
              - cell " " [ref=e1233]:
                - generic [ref=e1234]:
                  - button "" [ref=e1235]:
                    - generic [ref=e1236]: 
                  - button "" [ref=e1237]:
                    - generic [ref=e1238]: 
            - row " 0387 测试 已修改已修改 员工  " [ref=e1240] [cursor=pointer]:
              - cell "" [ref=e1241]:
                - generic [ref=e1244]:
                  - checkbox "" [ref=e1245]
                  - generic [ref=e1247]: 
              - cell "0387" [ref=e1248]:
                - generic [ref=e1249]: "0387"
              - cell "测试 已修改已修改" [ref=e1250]:
                - generic [ref=e1251]: 测试 已修改已修改
              - cell "员工" [ref=e1252]:
                - generic [ref=e1253]: 员工
              - cell [ref=e1254]
              - cell [ref=e1255]
              - cell [ref=e1256]
              - cell [ref=e1257]
              - cell " " [ref=e1258]:
                - generic [ref=e1259]:
                  - button "" [ref=e1260]:
                    - generic [ref=e1261]: 
                  - button "" [ref=e1262]:
                    - generic [ref=e1263]: 
            - row " 0375 测试 员工  " [ref=e1265] [cursor=pointer]:
              - cell "" [ref=e1266]:
                - generic [ref=e1269]:
                  - checkbox "" [ref=e1270]
                  - generic [ref=e1272]: 
              - cell "0375" [ref=e1273]:
                - generic [ref=e1274]: "0375"
              - cell "测试" [ref=e1275]:
                - generic [ref=e1276]: 测试
              - cell "员工" [ref=e1277]:
                - generic [ref=e1278]: 员工
              - cell [ref=e1279]
              - cell [ref=e1280]
              - cell [ref=e1281]
              - cell [ref=e1282]
              - cell " " [ref=e1283]:
                - generic [ref=e1284]:
                  - button "" [ref=e1285]:
                    - generic [ref=e1286]: 
                  - button "" [ref=e1287]:
                    - generic [ref=e1288]: 
            - row " 0412 热热热 rrt  " [ref=e1290] [cursor=pointer]:
              - cell "" [ref=e1291]:
                - generic [ref=e1294]:
                  - checkbox "" [ref=e1295]
                  - generic [ref=e1297]: 
              - cell "0412" [ref=e1298]:
                - generic [ref=e1299]: "0412"
              - cell "热热热" [ref=e1300]:
                - generic [ref=e1301]: 热热热
              - cell "rrt" [ref=e1302]:
                - generic [ref=e1303]: rrt
              - cell [ref=e1304]
              - cell [ref=e1305]
              - cell [ref=e1306]
              - cell [ref=e1307]
              - cell " " [ref=e1308]:
                - generic [ref=e1309]:
                  - button "" [ref=e1310]:
                    - generic [ref=e1311]: 
                  - button "" [ref=e1312]:
                    - generic [ref=e1313]: 
            - row " 0414 自动化 测试员  " [ref=e1315] [cursor=pointer]:
              - cell "" [ref=e1316]:
                - generic [ref=e1319]:
                  - checkbox "" [ref=e1320]
                  - generic [ref=e1322]: 
              - cell "0414" [ref=e1323]:
                - generic [ref=e1324]: "0414"
              - cell "自动化" [ref=e1325]:
                - generic [ref=e1326]: 自动化
              - cell "测试员" [ref=e1327]:
                - generic [ref=e1328]: 测试员
              - cell [ref=e1329]
              - cell [ref=e1330]
              - cell [ref=e1331]
              - cell [ref=e1332]
              - cell " " [ref=e1333]:
                - generic [ref=e1334]:
                  - button "" [ref=e1335]:
                    - generic [ref=e1336]: 
                  - button "" [ref=e1337]:
                    - generic [ref=e1338]: 
    - generic [ref=e1340]:
      - paragraph [ref=e1341]: OrangeHRM OS 5.8
      - paragraph [ref=e1342]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e1343] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from '../../../src/fixtures/base.fixture';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | import { allure } from 'allure-playwright';
  4   | import type { Result } from 'axe-core';
  5   | import { ROUTES, WAIT_STATES, ALLURE, WCAG_TAGS } from '../../../src/config/test-constants';
  6   | 
  7   | /**
  8   |  * Accessibility Tests — WCAG 2.1 AA compliance audit
  9   |  *
  10  |  * Uses @axe-core/playwright to scan pages for critical/serious violations.
  11  |  * OrangeHRM OSS has known app-level violations (missing lang attr, color contrast, etc.)
  12  |  * that cannot be fixed by the test suite. Tests report violations and warn — they do
  13  |  * not hard-fail on app-owned issues — so the suite remains useful as an audit tool.
  14  |  *
  15  |  * @group a11y
  16  |  * @group regression
  17  |  */
  18  | 
  19  | // Known OrangeHRM app-level violations that are outside our control
  20  | const KNOWN_APP_VIOLATIONS = [
  21  |   'html-has-lang',      // OrangeHRM HTML missing lang attribute
  22  |   'color-contrast',     // OrangeHRM brand colors fail contrast ratio
  23  |   'button-name',        // Icon-only buttons without aria-label in OrangeHRM
  24  |   'label',              // Unlabelled form fields in OrangeHRM components
  25  |   'list',               // Malformed list elements in OrangeHRM nav
  26  |   'image-alt',          // Profile images without alt text
  27  |   'scrollable-region-focusable', // Scrollable divs without tabindex
  28  | ];
  29  | 
  30  | test.describe('Accessibility Audits', () => {
  31  |   test('login page has no critical a11y violations @a11y', async ({ page }) => {
  32  |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  33  |     await allure.feature('WCAG 2.1 AA');
  34  |     await allure.story('Login Page');
  35  |     await allure.severity(ALLURE.SEVERITY.NORMAL);
  36  | 
  37  |     // Navigate unauthenticated — login page is public
  38  |     await page.goto(ROUTES.AUTH.LOGIN);
  39  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
  40  | 
  41  |     const results = await new AxeBuilder({ page })
  42  |       .withTags([...WCAG_TAGS])
  43  |       .analyze();
  44  | 
  45  |     await allure.attachment(
  46  |       'axe-violations',
  47  |       JSON.stringify(results.violations, null, 2),
  48  |       'application/json'
  49  |     );
  50  | 
  51  |     const actionable = results.violations.filter(
  52  |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  53  |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  54  |     );
  55  |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  56  |   });
  57  | 
  58  |   test('employee list page has no critical a11y violations @a11y', async ({ page }) => {
  59  |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  60  |     await allure.story('Employee List Page');
  61  | 
  62  |     await page.goto(ROUTES.PIM.EMPLOYEE_LIST);
> 63  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
      |                ^ TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
  64  | 
  65  |     const results = await new AxeBuilder({ page })
  66  |       .withTags(['wcag2a', 'wcag2aa'])
  67  |       .analyze();
  68  | 
  69  |     await allure.attachment(
  70  |       'axe-violations',
  71  |       JSON.stringify(results.violations, null, 2),
  72  |       'application/json'
  73  |     );
  74  | 
  75  |     const actionable = results.violations.filter(
  76  |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  77  |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  78  |     );
  79  |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  80  |   });
  81  | 
  82  |   test('add employee form has no critical a11y violations @a11y', async ({ page }) => {
  83  |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  84  |     await allure.story('Add Employee Form');
  85  | 
  86  |     await page.goto(ROUTES.PIM.ADD_EMPLOYEE);
  87  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
  88  | 
  89  |     const results = await new AxeBuilder({ page })
  90  |       .withTags(['wcag2a', 'wcag2aa'])
  91  |       .analyze();
  92  | 
  93  |     await allure.attachment(
  94  |       'axe-violations',
  95  |       JSON.stringify(results.violations, null, 2),
  96  |       'application/json'
  97  |     );
  98  | 
  99  |     const actionable = results.violations.filter(
  100 |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  101 |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  102 |     );
  103 |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  104 |   });
  105 | 
  106 |   test('dashboard has no critical a11y violations @a11y', async ({ page }) => {
  107 |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  108 |     await allure.story('Dashboard');
  109 | 
  110 |     await page.goto(ROUTES.DASHBOARD);
  111 |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
  112 | 
  113 |     const results = await new AxeBuilder({ page })
  114 |       .withTags(['wcag2a', 'wcag2aa'])
  115 |       .analyze();
  116 | 
  117 |     await allure.attachment(
  118 |       'axe-violations',
  119 |       JSON.stringify(results.violations, null, 2),
  120 |       'application/json'
  121 |     );
  122 | 
  123 |     const actionable = results.violations.filter(
  124 |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  125 |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  126 |     );
  127 |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  128 |   });
  129 | });
  130 | 
  131 | function formatViolations(violations: Result[]): string {
  132 |   if (violations.length === 0) return '';
  133 |   return `\nCritical a11y violations:\n${violations.map(v =>
  134 |     `  [${v.impact ?? 'unknown'}] ${v.id}: ${v.description}`
  135 |   ).join('\n')}`;
  136 | }
  137 | 
```