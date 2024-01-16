@ECHO OFF
chcp 65001
:: %1: server, local, %2: min, %3: fileName, %4: subFolderName %5: parentFolderName

set faceSet=4 6 8 10 12 20 24
set langSet=en
set landscapeSet=false

set htmFilename=%3%

::echo %5%
set parentFolderName=box
if "%5%" neq "" (
  REM echo %%5%% is defined.
  set parentFolderName=%5%
)

:: echo %4%
set subFolderName=
if "%4%" neq "" (
  REM echo %%4%% is defined.
  set subFolderName=%4%
)
set subFolderName=%subFolderName:\=\\%
:: echo subFolderName: %subFolderName%
:: pause & exit

if "%2%" == "min" (
  set minSeg=.min
) else (
  set minSeg=
)

set htmlPath=%cd%
::htmlPath:_bat\test\simple
::echo %htmlPath:_bat\%parentFolderName%\%htmFilename%
call set htmlPath=%%htmlPath:_bat\%parentFolderName%\%htmFilename%=%%
call set htmlPath=%%htmlPath:bat\%parentFolderName%\%htmFilename%=%%
::P:\anqi\Desktop\tech\ts\projects\dices\bat\test\simple
::echo %htmlPath%

if "%1%" == "server" (
  set url=https://anqisoft.github.io/
  set goal=%CD%\server%minSeg%.json
) else (
  set url=file:///%htmlPath:\=/%
  set goal=%CD%\local_en_landscape%minSeg%.json
)
set url=%url%%parentFolderName%/%htmFilename%%minSeg%.htm

:: https://www.codenong.com/37071353/
if "%subFolderName%" neq "" (
  set pdfPath=%htmlPath:\=\\%%parentFolderName%\\%htmFilename%\\%subFolderName%\\pdfs\\
) else (
  set pdfPath=%htmlPath:\=\\%%parentFolderName%\\%htmFilename%\\pdfs\\
)
set pdfPath=%pdfPath:\\\\=\\%
:: echo %pdfPath% && pause
:: echo %url%

echo [>%goal%

title "Create json config file for local"

setlocal enabledelayedexpansion
::4 => 69
::6 => 9
::8 => 10
::10 => 22
::12 => 12
::20 => 4
::24 => 8
for %%l in (!langSet!) do (
  set lang=%%l
  rem echo !lang!

  for %%f in (!faceSet!) do (
    set face=%%f
    set max_no=3
    if "!face!" == "4" (
      set max_no=69
    )
    if "!face!" == "6" (
      set max_no=9
    )
    if "!face!" == "8" (
      set max_no=10
    )
    if "!face!" == "10" (
      set max_no=22
    )
    if "!face!" == "12" (
      set max_no=12
    )
    if "!face!" == "20" (
      set max_no=4
    )
    if "!face!" == "24" (
      set max_no=8
    )
    REM echo !face!: !max_no!
    
    for /L %%n in (1, 1, !max_no!) do (
      set no=%%n
      rem echo !no!

      for %%d in (!landscapeSet!) do (
        set landscape=%%d
        rem echo !lang! !no! !landscape!

        if "!landscape!" == "true" (
          set pdfFile=landscape
        ) else (
          set pdfFile=portrait
        )
        rem echo !pdfFile!

        set endChar=,
        if "!lang!:!face!:!no!:!landscape!" == "en:24:8:false" (
          set endChar=
        )
        echo   { "url": "!url!?lang=!lang!&landscape=!landscape!&face=!face!&no=!no!", "pdf": "!pdfPath!!lang!\\!pdfFile!\\!face!_!no!.pdf", "params": { } }!endChar!>>%goal%
      )
    )
  )
)

echo ]>>%goal%
PAUSE & exit