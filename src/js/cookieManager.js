class CookieManager {
  setCookie(name, value, options = {}) {
    options = {
      path: "/",
      // additional
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }

  getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  genUrl() {
    var url = window.location.href.split("r=")[1];
    return url;
  }

  redirectToIfCookie() {
    if (this.getCookie("gapmania") !== undefined) {
      window.location.href = this.genUrl();
    }
  }
}

const cookieManager = new CookieManager();
export default cookieManager;
