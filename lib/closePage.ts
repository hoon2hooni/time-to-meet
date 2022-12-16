export default function closePage() {
  const _userAgent = window.navigator.userAgent;
  const isKakaoWebview =
    _userAgent.toLocaleLowerCase().indexOf("kakaotalk") > -1;
    
  if (isKakaoWebview) {
    const isIOS = /iPad|iPhone|iPod/.test(_userAgent);

    window.location.href = isIOS
      ? "kakaoweb://closeBrowser"
      : "kakaotalk://inappbrowser/close";
    return;
  }

  window.open("", "_self")?.close();
}
