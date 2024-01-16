@ECHO OFF
if "%1%" == "" exit

set goal_path=..\doc\_results\
set ts_file_name=%1%

cd ..\..\src\
::echo %cd%\%goal_path%%ts_file_name%.txt && pause
deno run -A %ts_file_name%.ts >%goal_path%%ts_file_name%.txt || pause