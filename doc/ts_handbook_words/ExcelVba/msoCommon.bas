Attribute VB_Name = "msoCommon"
Option Explicit
Global Const CON_LINE_SCALE As Single = 105.25 / 3.7125
Global Const CON_PAPER_HEIGHT_A4 As Single = 29.7
Global Const CON_PAPER_WIDTH_A4 As Single = 21

Global Const DEBUG_SHOW_USED_TIME As Boolean = True

Global Const vbTab01 As String = vbTab
Global Const vbTab02 As String = vbTab01 & vbTab
Global Const vbTab03 As String = vbTab02 & vbTab
Global Const vbTab04 As String = vbTab03 & vbTab
Global Const vbTab05 As String = vbTab04 & vbTab
Global Const vbTab06 As String = vbTab05 & vbTab
Global Const vbTab07 As String = vbTab06 & vbTab
Global Const vbTab08 As String = vbTab07 & vbTab
Global Const vbTab09 As String = vbTab08 & vbTab
Global Const vbTab10 As String = vbTab09 & vbTab
Global Const vbTab11 As String = vbTab10 & vbTab
Global Const vbTab12 As String = vbTab11 & vbTab
Global Const vbTab13 As String = vbTab12 & vbTab
Global Const vbTab14 As String = vbTab13 & vbTab
Global Const vbTab15 As String = vbTab14 & vbTab
Global Const vbTab16 As String = vbTab15 & vbTab
Global Const vbTab17 As String = vbTab16 & vbTab
Global Const vbTab18 As String = vbTab17 & vbTab
Global Const vbTab19 As String = vbTab18 & vbTab
Global Const vbTab20 As String = vbTab19 & vbTab
Global Const vbTab21 As String = vbTab20 & vbTab
Global Const vbTab22 As String = vbTab21 & vbTab
Global Const vbTab23 As String = vbTab22 & vbTab
Global Const vbTab24 As String = vbTab23 & vbTab

Private m_sDebugUsedTime As String

' https://zhidao.baidu.com/question/461466664.html
' 注意：timeGetTime必须小写（区分大小写）
Private Declare Function timeGetTime Lib "winmm.dll" () As Long
Private m_lStartMicroseconds As Long

Private m_bTempEnvironmentStarted As Boolean

Function SetTempEnvironment()
  If m_bTempEnvironmentStarted Then
    Exit Function
  End If

  m_sDebugUsedTime = Now()
  m_lStartMicroseconds = timeGetTime()
    
  ' 加速段（无屏幕回显，无提示）
  Application.ScreenUpdating = False
  Application.DisplayAlerts = False
  
  m_bTempEnvironmentStarted = True
End Function

Function RestoreEnvironment( _
  Optional sFeatureName As String = "" _
  , Optional sAppendInfo As String = "" _
  , Optional sTitle As String = "" _
  , Optional bNotShow As Boolean = False _
  , Optional msgboxStyle As VbMsgBoxStyle = VbMsgBoxStyle.vbOKOnly _
)
  If Not m_bTempEnvironmentStarted Then
    Exit Function
  End If
  
  ' 恢复正常设置（屏幕回显，正常提示）
  Application.ScreenUpdating = True
  Application.DisplayAlerts = True
  
  Dim lEndMicroseconds As Long
  Dim lUsedMicroseconds As Long
  lEndMicroseconds = timeGetTime()
  lUsedMicroseconds = lEndMicroseconds - m_lStartMicroseconds
  
  Dim sMessage As String
  sMessage = "始：" & m_sDebugUsedTime & vbCrLf & "终：" & Now() & vbCrLf & "耗：" & CStr(lUsedMicroseconds) & "毫秒"
  
  ' 注意：/与\是不一样的。CInt(3 / 2)得到2，CInt(3 \ 2)得到1！
  If lUsedMicroseconds >= 1000 Then
    sMessage = sMessage & vbCrLf & "即："
    
    Dim sMicrosecondPart As String
    sMicrosecondPart = IIf(lUsedMicroseconds Mod 1000 = 0, "", CStr(lUsedMicroseconds Mod 1000) & "毫秒")
    lUsedMicroseconds = CLng(lUsedMicroseconds \ 1000)
    If lUsedMicroseconds >= 3600 Then
      sMessage = sMessage & CStr(CInt(lUsedMicroseconds \ 3600)) & "小时"
      lUsedMicroseconds = lUsedMicroseconds Mod 3600
    End If
    If lUsedMicroseconds >= 60 Then
      sMessage = sMessage & CStr(CInt(lUsedMicroseconds \ 60)) & "分"
      lUsedMicroseconds = lUsedMicroseconds Mod 60
    End If
    sMessage = sMessage & CStr(lUsedMicroseconds) & "秒" & sMicrosecondPart
  End If
    
  m_bTempEnvironmentStarted = False
  If Not bNotShow Then
    MsgBox IIf(0 = Len(sAppendInfo), sMessage, sAppendInfo & vbCrLf & sFeatureName & "耗时" & vbCrLf & sMessage) _
      , Title:=IIf(0 = Len(sTitle), sFeatureName & "耗时", sTitle), Buttons:=msgboxStyle
  Else
    Debug.Print IIf(0 = Len(sAppendInfo), sMessage, sAppendInfo & vbCrLf & sFeatureName & "耗时" & vbCrLf & sMessage), IIf(0 = Len(sTitle), sFeatureName & "耗时", sTitle)
  End If
End Function

Function SetTempEnvironmentAndRestore()
  ' 函数样例：设置临时环境并恢复（同时显示所消耗时间）
  Dim sDebugUsedTime As String
  sDebugUsedTime = Now()
  Call SetTempEnvironment
  
  Call RestoreEnvironment
  MsgBox "始：" & sDebugUsedTime & vbCrLf & "终：" & Now(), Title:="耗时"
End Function

Private Sub TestDivide()
  ' 注意：/与\是不一样的。CInt(3 / 2)得到2，CInt(3 \ 2)得到1！
  MsgBox "CInt(3 / 2) => " & CStr(CInt(3 / 2)) & vbCrLf & "CInt(3 \ 2) => " & CStr(CInt(3 \ 2))
End Sub

Public Function GetTimestampPostfix() As String
  GetTimestampPostfix = Format(Now(), "_yymmdd_hhnnss")
End Function

Public Function GetTimestamp() As String
  GetTimestamp = Format(Now(), "yymmdd_hhnnss")
End Function

Public Function GetTimestampWithChinese() As String
  GetTimestampWithChinese = Format(Now(), "yyyy年mm月dd日 hh:nn:ss")
End Function

Public Function StrRepeat(i_sOriginal As String, i_iTimes As Integer) As String
  If Len(i_sOriginal) = 0 Or i_iTimes < 1 Then
    Exit Function
  End If
  
  Dim i As Integer
  For i = 1 To i_iTimes
    StrRepeat = StrRepeat & i_sOriginal
  Next
End Function

Public Function ConvertCharCountToPoint(ByVal iCharCount As Integer) As Single
  Select Case iCharCount
  Case 4: ConvertCharCountToPoint = 1.69
  Case 5: ConvertCharCountToPoint = 2.12
  Case 6: ConvertCharCountToPoint = 2.54
  Case 7: ConvertCharCountToPoint = 2.96
  Case 8: ConvertCharCountToPoint = 3.39
  Case 9: ConvertCharCountToPoint = 3.81
  Case Else: ConvertCharCountToPoint = 0
  End Select
End Function

Public Function ConvertCamelNameToEnglishWords(sOriginalName As String)
  ConvertCamelNameToEnglishWords = sOriginalName
  Const CON_CAPITAIL_LETTERS As String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  Dim iLength As Integer
  iLength = Len(sOriginalName)
  If iLength = 0 Then
    Exit Function
  End If

  Dim iLoop As Integer
  Dim sChar As String * 1
  For iLoop = 1 To 26
    sChar = Mid(CON_CAPITAIL_LETTERS, iLoop, 1)
    ConvertCamelNameToEnglishWords = Trim(Replace(ConvertCamelNameToEnglishWords, sChar, " " & sChar))
  Next
End Function
