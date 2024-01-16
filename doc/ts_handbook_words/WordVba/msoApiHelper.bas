Attribute VB_Name = "msoApiHelper"
Option Explicit

Public Declare Sub Sleep Lib "kernel32" (ByVal dwMilliseconds As Long)

Public Declare Function SetFocus Lib "User32" (ByVal hwnd As Long) As Long
Public Declare Function SetActiveWindow Lib "User32" (ByVal hwnd As Long) As Long
Public Declare Function SetForegroundWindow Lib "User32" (ByVal hwnd As Long) As Long

' 函数功能：该函数设置指定窗口的显示状态。
' hWnd：窗口句柄。
' nCmdShow：指定窗口如何显示。如果发送应用程序的程序提供了STARTUPINFO结构，则应用程序第一次调用ShowWindow时该参数被忽略。否则，在第一次调用ShowWindow函数时，该值应为在函数WinMain中nCmdShow参数。在随后的调用中，该参数可以为下列值之一：
'   SW_FORCEMINIMIZE：在WindowNT5.0中最小化窗口，即使拥有窗口的线程被挂起也会最小化。在从其他线程最小化窗口时才使用这个参数。
'   SW_HIDE：隐藏窗口并激活其他窗口。
'   SW_MAXIMIZE：最大化指定的窗口。
'   SW_MINIMIZE：最小化指定的窗口并且激活在Z序中的下一个顶层窗口。
'   SW_RESTORE：激活并显示窗口。如果窗口最小化或最大化，则系统将窗口恢复到原来的尺寸和位置。在恢复最小化窗口时，应用程序应该指定这个标志。
'   SW_SHOW：在窗口原来的位置以原来的尺寸激活和显示窗口。
'   SW_SHOWDEFAULT：依据在STARTUPINFO结构中指定的SW_FLAG标志设定显示状态，STARTUPINFO 结构是由启动应用程序的程序传递给CreateProcess函数的。
'   SW_SHOWMAXIMIZED：激活窗口并将其最大化。
'   SW_SHOWMINIMIZED：激活窗口并将其最小化。
'   SW_SHOWMINNOACTIVE：窗口最小化，激活窗口仍然维持激活状态。
'   SW_SHOWNA：以窗口原来的状态显示窗口。激活窗口仍然维持激活状态。
'   SW_SHOWNOACTIVATE：以窗口最近一次的大小和状态显示窗口。激活窗口仍然维持激活状态。
'   SW_SHOWNORMAL：激活并显示一个窗口。如果窗口被最小化或最大化，系统将其恢复到原来的尺寸和大小。应用程序在第一次显示窗口的时候应该指定此标志。
' 返回值：如果窗口以前可见，则返回值为非零。如果窗口以前被隐藏，则返回值为零。
' 备注：应用程序第一次调用ShowWindow时，应该使用WinMain函数的nCmdshow参数作为它的nCmdShow参数。在随后调用ShowWindow函数时，必须使用列表中的一个给定值，而不是由WinMain函数的nCmdSHow参数指定的值。
Public Declare Function ShowWindow Lib "User32" (ByVal hwnd As Long, ByVal nCmdShow As Long) As Long
' 隐藏窗口并激活其他窗口
Public Const SW_HIDE = 0
' 激活并显示一个窗口。如果窗口被最小化或最大化，系统将其恢复到原来的尺寸和大小。应用程序在第一次显示窗口的时候应该指定此标志。
Public Const SW_SHOWNORMAL = 1
' 激活窗口并将其最小化。
Public Const SW_SHOWMINIMIZED = 2
' 激活窗口并将其最大化。
Public Const SW_SHOWMAXIMIZED = 3
' 最大化指定的窗口。
Public Const SW_MAXIMIZE = 3
' 以窗口最近一次的大小和状态显示窗口。激活窗口仍然维持激活状态。
Public Const SW_SHOWNOACTIVATE = 4
' 在窗口原来的位置以原来的尺寸激活和显示窗口。
Public Const SW_SHOW = 5
' 最小化指定的窗口并且激活在Z序中的下一个顶层窗口。
Public Const SW_MINIMIZE = 6
' 窗口最小化，激活窗口仍然维持激活状态。
Public Const SW_SHOWMINNOACTIVE = 7
' 以窗口原来的状态显示窗口。激活窗口仍然维持激活状态。
Public Const SW_SHOWNA = 8
' 激活并显示窗口。如果窗口最小化或最大化，则系统将窗口恢复到原来的尺寸和位置。在恢复最小化窗口时，应用程序应该指定这个标志。
Public Const SW_RESTORE = 9
' 依据在STARTUPINFO结构中指定的SW_FLAG标志设定显示状态，STARTUPINFO 结构是由启动应用程序的程序传递给CreateProcess函数的。
Public Const SW_SHOWDEFAULT As Long = 10
' 在WindowNT5.0中最小化窗口，即使拥有窗口的线程被挂起也会最小化。在从其他线程最小化窗口时才使用这个参数。
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
''  ' 错误：无效使用new
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
'        ' 错误：数据或方法未找到
'        results.Add hwnd, Left$(buffer, retValue)
'      End If
'    End If
'  End If
'  EnumWindowCallback = 1
'End Function
