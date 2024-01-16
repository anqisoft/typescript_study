@ECHO OFF
if "%1%" == "" exit

set goal_path=..\dist\deno\
set deno_json_path=%cd%\..\..\deno.json
set ts_file_name=%1%
cd ..\..\src\

deno bundle -c %deno_json_path% --no-check %ts_file_name%.ts %goal_path%%ts_file_name%.js || pause