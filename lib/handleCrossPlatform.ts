export function closePage() {
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

export const normalizeTouchAndMouseEvent = (e: MouseEvent | TouchEvent) => {
  if (e instanceof MouseEvent) {
    return {
      clientX: e.clientX,
      clientY: e.clientY,
      
    };
  } else {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
    };
  }
};

export const getIsMobile = () =>
  window !== undefined
    ? /Android|iPhone|ipad/i.test(window.navigator.userAgent)
    : false;
