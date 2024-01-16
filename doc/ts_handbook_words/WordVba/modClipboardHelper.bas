Attribute VB_Name = "modClipboardHelper"
Option Explicit

Const CON_MODULE_NAME As String = "modClipboardHelper"

' 失败：https://zhidao.baidu.com/question/158212598.html?qbl=relate_question_3&word=vba%20%C7%E5%BF%D5%BC%F4%CC%F9%B0%E5
'Private m_oData As New DataObject

'Sub ClearClipboardByObject()
'  m_oData.SetText ""
'  m_oData.PutInClipboard
'End Sub
'
'Public Function GetClipboardText() As String
'  m_oData.GetFromClipboard
'  GetClipboardText = m_oData.GetText
'End Function

Sub ClearClipboard()
  ' 实测确定OpenClipboard(Application.hwnd)无效
  OpenClipboard 0
  EmptyClipboard
  CloseClipboard
  
  ' Excel可以用：Application.CutCopyMode = False禁止拷贝（没有完全清空剪贴板）
End Sub

' http://www.exceloffice.net/archives/1198
Public Function SetClipboardText(sText As String) As Boolean
  '内存对象的句柄
  Dim hMem As Long
  hMem = GlobalAlloc(GHND, LenB(sText) + 2)
  
  '锁定内存块，获取内存对象的第一个字节的内存地址
  Dim lHwnd As Long
  lHwnd = GlobalLock(hMem)
  
  '将字符串至于剪贴板内存中
  CopyMemory lHwnd, StrPtr(sText), LenB(sText) + 2
  
  '解锁内存块
  GlobalUnlock (hMem)
  
  OpenClipboard (0)
  EmptyClipboard
  '关联剪贴板对象到指定的内存句柄
  SetClipboardData CF_UNICODETEXT, hMem
  CloseClipboard
    
  SetClipboardText = True
End Function

' http://www.office-cn.net/access-vba/1032.mhtml
Public Function GetTextFromClipboard() As Variant
    Dim wLen As Integer
    Dim hMemory As Long
    Dim hMyMemory As Long

    Dim lpMemory As Long
    Dim lpMyMemory As Long

    Dim retval As Variant
    Dim wFreeMemory As Boolean
    Dim wClipAvail As Integer
    Dim szText As String
    Dim wSize As Long

    If IsClipboardFormatAvailable(CF_TEXT) = APINULL Then
        GetTextFromClipboard = Null
        Exit Function
    End If

    If OpenClipboard(0&) = APINULL Then
        MsgBox "Unable to open Clipboard.  Perhaps some other application is using it."
        GoTo CB2T_Free
    End If

    hMemory = GetClipboardData(CF_TEXT)
    If hMemory = APINULL Then
        MsgBox "无法从剪切板获取文本."
        Exit Function
    End If
    wSize = GlobalSize(hMemory)
    szText = Space(wSize)

    wFreeMemory = True

    lpMemory = GlobalLock(hMemory)
    If lpMemory = APINULL Then
        MsgBox "无法锁定剪切板内存."
        GoTo CB2T_Free
    End If

    ' Copy our string into the locked memory.
    retval = Lstrcpy(szText, lpMemory)
    ' Get rid of trailing stuff.
    szText = Trim(szText)
    ' Get rid of trailing 0.
    GetTextFromClipboard = Left(szText, Len(szText) - 1)
    wFreeMemory = False

CB2T_Close:
    If CloseClipboard() = APINULL Then
        MsgBox "无法关闭剪切板."
    End If
    If wFreeMemory Then GoTo CB2T_Free
    Exit Function

CB2T_Free:
    If GlobalFree(hMemory) <> APINULL Then
        MsgBox "无法释放剪切板内存."
    End If
End Function

