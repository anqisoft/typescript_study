Attribute VB_Name = "msoCommon"
Option Explicit
Global Const CON_LINE_SCALE As Single = 105.25 / 3.7125
Global Const CON_PAPER_HEIGHT_A4 As Single = 29.7
Global Const CON_PAPER_WIDTH_A4 As Single = 21

Global Const CON_PAPER_HEIGHT_A3 As Single = 42
Global Const CON_PAPER_WIDTH_A3 As Single = 29.7

Global Const CON_LINE_LENGTH_OF_PAPER_HEIGHT_A4 As Single = CON_LINE_SCALE * CON_PAPER_HEIGHT_A4
Global Const CON_LINE_LENGTH_OF_PAPER_WIDTH_A4 As Single = CON_LINE_SCALE * CON_PAPER_WIDTH_A4

Global Const CON_LINE_LENGTH_OF_PAPER_HEIGHT_A3 As Single = CON_LINE_SCALE * CON_PAPER_HEIGHT_A3
Global Const CON_LINE_LENGTH_OF_PAPER_WIDTH_A3 As Single = CON_LINE_SCALE * CON_PAPER_WIDTH_A3

Global Const DEBUG_SHOW_USED_TIME As Boolean = True
Private m_sDebugUsedTime As String

' https://zhidao.baidu.com/question/461466664.html
Private Declare Function timeGetTime Lib "winmm.dll" () As Long
Private m_lStartMicroseconds As Long

Private m_bTempEnvironmentStarted As Boolean

Function SetTempEnvironment()
  If m_bTempEnvironmentStarted Then
    Exit Function
  End If

  m_sDebugUsedTime = Now()
  m_lStartMicroseconds = timeGetTime()
    
  ' ���ٶΣ�����Ļ���ԣ�����ʾ��
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
  
  ' �ָ��������ã���Ļ���ԣ�������ʾ��
  Application.ScreenUpdating = True
  Application.DisplayAlerts = True
  
  Dim lEndMicroseconds As Long
  Dim lUsedMicroseconds As Long
  lEndMicroseconds = timeGetTime()
  lUsedMicroseconds = lEndMicroseconds - m_lStartMicroseconds
  
  Dim sMessage As String
  sMessage = "ʼ��" & m_sDebugUsedTime & vbCrLf & "�գ�" & Now() & vbCrLf & "�ģ�" & CStr(lUsedMicroseconds) & "����"
  
  ' ע�⣺/��\�ǲ�һ���ġ�CInt(3 / 2)�õ�2��CInt(3 \ 2)�õ�1��
  If lUsedMicroseconds >= 1000 Then
    sMessage = sMessage & vbCrLf & "����"
    
    Dim sMicrosecondPart As String
    sMicrosecondPart = IIf(lUsedMicroseconds Mod 1000 = 0, "", CStr(lUsedMicroseconds Mod 1000) & "����")
    lUsedMicroseconds = CLng(lUsedMicroseconds \ 1000)
    If lUsedMicroseconds >= 3600 Then
      sMessage = sMessage & CStr(CInt(lUsedMicroseconds \ 3600)) & "Сʱ"
      lUsedMicroseconds = lUsedMicroseconds Mod 3600
    End If
    If lUsedMicroseconds >= 60 Then
      sMessage = sMessage & CStr(CInt(lUsedMicroseconds \ 60)) & "��"
      lUsedMicroseconds = lUsedMicroseconds Mod 60
    End If
    sMessage = sMessage & CStr(lUsedMicroseconds) & "��" & sMicrosecondPart
  End If
    
  m_bTempEnvironmentStarted = False
  If Not bNotShow Then
    MsgBox IIf(0 = Len(sAppendInfo), sMessage, sAppendInfo & vbCrLf & sFeatureName & "��ʱ" & vbCrLf & sMessage) _
      , Title:=IIf(0 = Len(sTitle), sFeatureName & "��ʱ", sTitle), Buttons:=msgboxStyle
  Else
    Debug.Print IIf(0 = Len(sAppendInfo), sMessage, sAppendInfo & vbCrLf & sFeatureName & "��ʱ" & vbCrLf & sMessage), IIf(0 = Len(sTitle), sFeatureName & "��ʱ", sTitle)
  End If
End Function

Function SetTempEnvironmentAndRestore()
  ' ����������������ʱ�������ָ���ͬʱ��ʾ������ʱ�䣩
  Dim sDebugUsedTime As String
  sDebugUsedTime = Now()
  Call SetTempEnvironment
  
  Call RestoreEnvironment
  MsgBox "ʼ��" & sDebugUsedTime & vbCrLf & "�գ�" & Now(), Title:="��ʱ"
End Function

Private Sub TestDivide()
  ' ע�⣺/��\�ǲ�һ���ġ�CInt(3 / 2)�õ�2��CInt(3 \ 2)�õ�1��
  MsgBox "CInt(3 / 2) => " & CStr(CInt(3 / 2)) & vbCrLf & "CInt(3 \ 2) => " & CStr(CInt(3 \ 2))
End Sub

Public Function GetTimestampPostfix() As String
  GetTimestampPostfix = Format(Now(), "_yymmdd_hhnnss")
End Function

Public Function GetTimestamp() As String
  GetTimestamp = Format(Now(), "yymmdd_hhnnss")
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

Public Function StartOtherApplication(sPath As String, Optional winStyle As VbAppWinStyle = VbAppWinStyle.vbMinimizedFocus) As Long
  '  vbHide��vbMaximizedFocus��vbMinimizedFocus��vbMinimizedNoFocus��vbNormalFocus��vbNormalNoFocus
  StartOtherApplication = Shell(sPath, winStyle)
End Function
