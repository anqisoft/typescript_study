Attribute VB_Name = "msoApiHelper"
Option Explicit

Public Declare Sub Sleep Lib "kernel32" (ByVal dwMilliseconds As Long)

Public Declare Function SetFocus Lib "User32" (ByVal hwnd As Long) As Long
Public Declare Function SetActiveWindow Lib "User32" (ByVal hwnd As Long) As Long
Public Declare Function SetForegroundWindow Lib "User32" (ByVal hwnd As Long) As Long

' �������ܣ��ú�������ָ�����ڵ���ʾ״̬��
' hWnd�����ھ����
' nCmdShow��ָ�����������ʾ���������Ӧ�ó���ĳ����ṩ��STARTUPINFO�ṹ����Ӧ�ó����һ�ε���ShowWindowʱ�ò��������ԡ������ڵ�һ�ε���ShowWindow����ʱ����ֵӦΪ�ں���WinMain��nCmdShow�����������ĵ����У��ò�������Ϊ����ֵ֮һ��
'   SW_FORCEMINIMIZE����WindowNT5.0����С�����ڣ���ʹӵ�д��ڵ��̱߳�����Ҳ����С�����ڴ������߳���С������ʱ��ʹ�����������
'   SW_HIDE�����ش��ڲ������������ڡ�
'   SW_MAXIMIZE�����ָ���Ĵ��ڡ�
'   SW_MINIMIZE����С��ָ���Ĵ��ڲ��Ҽ�����Z���е���һ�����㴰�ڡ�
'   SW_RESTORE�������ʾ���ڡ����������С������󻯣���ϵͳ�����ڻָ���ԭ���ĳߴ��λ�á��ڻָ���С������ʱ��Ӧ�ó���Ӧ��ָ�������־��
'   SW_SHOW���ڴ���ԭ����λ����ԭ���ĳߴ缤�����ʾ���ڡ�
'   SW_SHOWDEFAULT��������STARTUPINFO�ṹ��ָ����SW_FLAG��־�趨��ʾ״̬��STARTUPINFO �ṹ��������Ӧ�ó���ĳ��򴫵ݸ�CreateProcess�����ġ�
'   SW_SHOWMAXIMIZED������ڲ�������󻯡�
'   SW_SHOWMINIMIZED������ڲ�������С����
'   SW_SHOWMINNOACTIVE��������С�����������Ȼά�ּ���״̬��
'   SW_SHOWNA���Դ���ԭ����״̬��ʾ���ڡ��������Ȼά�ּ���״̬��
'   SW_SHOWNOACTIVATE���Դ������һ�εĴ�С��״̬��ʾ���ڡ��������Ȼά�ּ���״̬��
'   SW_SHOWNORMAL�������ʾһ�����ڡ�������ڱ���С������󻯣�ϵͳ����ָ���ԭ���ĳߴ�ʹ�С��Ӧ�ó����ڵ�һ����ʾ���ڵ�ʱ��Ӧ��ָ���˱�־��
' ����ֵ�����������ǰ�ɼ����򷵻�ֵΪ���㡣���������ǰ�����أ��򷵻�ֵΪ�㡣
' ��ע��Ӧ�ó����һ�ε���ShowWindowʱ��Ӧ��ʹ��WinMain������nCmdshow������Ϊ����nCmdShow��������������ShowWindow����ʱ������ʹ���б��е�һ������ֵ����������WinMain������nCmdSHow����ָ����ֵ��
Public Declare Function ShowWindow Lib "User32" (ByVal hwnd As Long, ByVal nCmdShow As Long) As Long
' ���ش��ڲ�������������
Public Const SW_HIDE = 0
' �����ʾһ�����ڡ�������ڱ���С������󻯣�ϵͳ����ָ���ԭ���ĳߴ�ʹ�С��Ӧ�ó����ڵ�һ����ʾ���ڵ�ʱ��Ӧ��ָ���˱�־��
Public Const SW_SHOWNORMAL = 1
' ����ڲ�������С����
Public Const SW_SHOWMINIMIZED = 2
' ����ڲ�������󻯡�
Public Const SW_SHOWMAXIMIZED = 3
' ���ָ���Ĵ��ڡ�
Public Const SW_MAXIMIZE = 3
' �Դ������һ�εĴ�С��״̬��ʾ���ڡ��������Ȼά�ּ���״̬��
Public Const SW_SHOWNOACTIVATE = 4
' �ڴ���ԭ����λ����ԭ���ĳߴ缤�����ʾ���ڡ�
Public Const SW_SHOW = 5
' ��С��ָ���Ĵ��ڲ��Ҽ�����Z���е���һ�����㴰�ڡ�
Public Const SW_MINIMIZE = 6
' ������С�����������Ȼά�ּ���״̬��
Public Const SW_SHOWMINNOACTIVE = 7
' �Դ���ԭ����״̬��ʾ���ڡ��������Ȼά�ּ���״̬��
Public Const SW_SHOWNA = 8
' �����ʾ���ڡ����������С������󻯣���ϵͳ�����ڻָ���ԭ���ĳߴ��λ�á��ڻָ���С������ʱ��Ӧ�ó���Ӧ��ָ�������־��
Public Const SW_RESTORE = 9
' ������STARTUPINFO�ṹ��ָ����SW_FLAG��־�趨��ʾ״̬��STARTUPINFO �ṹ��������Ӧ�ó���ĳ��򴫵ݸ�CreateProcess�����ġ�
Public Const SW_SHOWDEFAULT As Long = 10
' ��WindowNT5.0����С�����ڣ���ʹӵ�д��ڵ��̱߳�����Ҳ����С�����ڴ������߳���С������ʱ��ʹ�����������
Public Const SW_FORCEMINIMIZE As Long = 11

Public Declare Function PostMessage Lib "User32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, ByVal lParam As Long) As Long
Public Const WM_LBUTTONDOWN = &H201
Public Const WM_LBUTTONUP = &H202

Public Declare Function EnumWindows Lib "User32" (ByVal lpEnumFunc As Long, ByVal param As Long) As Long
Public Declare Function IsWindowVisible Lib "User32" (ByVal hwnd As Long) As Long
Public Declare Function GetWindowText Lib "User32" Alias "GetWindowTextA" (ByVal hwnd As Long, ByVal lpString As String, ByVal cch As Long) As Long

Public Declare Function FindWindow Lib "User32" Alias "FindWindowA" (ByVal lpClassName As String, ByVal lpWindowName As String) As Long
Public Declare Function FindWindowEx Lib "User32" Alias "FindWindowExA" (ByVal hWnd1 As Long, ByVal hWnd2 As Long, ByVal lpsz1 As String, ByVal lpsz2 As String) As Long
Public Declare Function EnableWindow Lib "User32" (ByVal hwnd As Long, ByVal fEnable As Long) As Long
Public Declare Function SendMessage Lib "User32" Alias "SendMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long
Public Const WM_CLOSE = &H10
Public Const WM_SETTEXT = &HC

' https://zhidao.baidu.com/question/1642696131469773500.html
#If VBA7 Then
    Public Declare PtrSafe Function OpenClipboard Lib "User32" (ByVal hwnd As LongPtr) As Long
    Public Declare PtrSafe Function CloseClipboard Lib "User32" () As Long
    Public Declare PtrSafe Function EmptyClipboard Lib "User32" () As Long
#Else
    Public Declare Function OpenClipboard Lib "User32" (ByVal hwnd As LongPtr) As Long
    Public Declare Function CloseClipboard Lib "User32" () As Long
    Public Declare Function EmptyClipboard Lib "User32" () As Long
#End If


Public Declare Function IsClipboardFormatAvailable Lib "User32" (ByVal wFormat As Long) As Long
Public Declare Function SetClipboardData Lib "User32" (ByVal wFormat As Long, ByVal hMem As Long) As Long
Public Declare Function GetClipboardData Lib "User32" (ByVal wFormat As Long) As Long
Public Declare Function GlobalAlloc Lib "kernel32" (ByVal wFlags As Long, ByVal dwBytes As Long) As Long
Public Declare Function GlobalLock Lib "kernel32" (ByVal hMem As Long) As Long
Public Declare Function GlobalUnlock Lib "kernel32" (ByVal hMem As Long) As Boolean
Public Declare Function Lstrcpy Lib "kernel32" Alias "lstrcpyA" (ByVal lpString1 As Any, ByVal lpString2 As Any) As Long
Public Declare Function GlobalFree Lib "kernel32" (ByVal hMem As Long) As Long
Public Declare Function GlobalSize Lib "kernel32" (ByVal hMem As Long) As Long
Public Declare Sub CopyMemory Lib "kernel32" Alias "RtlMoveMemory" (ByVal pDest As Long, ByVal pSource As Long, ByVal length As Long)
Public Const GHND = &H42
Public Const CF_TEXT = 1
Public Const APINULL = 0
Public Const CF_UNICODETEXT = 13

'Public Const MAX_LEN = 260
'
'
'Public results As Dictionary
'Public criteria As String
'
'
''Public Sub Example()
''  criteria = "win32*"
''  ' ������Чʹ��new
''  Set results = New Dictionary
''  Call EnumWindows(AddressOf EnumWindowCallback, &H0)
''  Dim result As Variant
''  For Each result In results.Keys
''    Debug.Print result & " - " & results(result)
''  Next result
''End Sub
'
'Public Function EnumWindowCallback(ByVal hwnd As Long, ByVal param As Long) As Long
'  Dim retValue As Long
'  Dim buffer As String
'  If IsWindowVisible(hwnd) Then
'    buffer = Space$(MAX_LEN)
'    retValue = GetWindowText(hwnd, buffer, Len(buffer))
'    If retValue Then
'      If buffer Like criteria Then
'        ' �������ݻ򷽷�δ�ҵ�
'        results.Add hwnd, Left$(buffer, retValue)
'      End If
'    End If
'  End If
'  EnumWindowCallback = 1
'End Function
