@ECHO OFF

REM SET timestamp=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
REM SET timestamp=%timestamp: =0%

for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set timestamp=%dt:~0,8%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

echo %timestamp%
set log=%cd%\..\..\log\fmt\fmt_%timestamp%.txt
echo %log%

cd ..\..\src

deno fmt 2>%log%

start "" notepad %log%

pause