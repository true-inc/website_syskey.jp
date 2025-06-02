document.addEventListener("DOMContentLoaded", () => {
  // モバイルメニューの要素を取得
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")
  const hamburgerIcon = mobileMenuButton ? mobileMenuButton.querySelector(".hamburger-icon") : null
  const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : []

  // モバイルメニューの開閉
  function toggleMobileMenu() {
    if (!mobileMenu || !hamburgerIcon) return

    if (mobileMenu.classList.contains("hidden")) {
      // メニューを開く
      mobileMenu.classList.remove("hidden")
      mobileMenu.classList.add("animate-fadeIn")
      hamburgerIcon.classList.add("active")
      mobileMenuButton.setAttribute("aria-expanded", "true")
      mobileMenuButton.setAttribute("aria-label", "メニューを閉じる")
    } else {
      // メニューを閉じる
      mobileMenu.classList.add("hidden")
      hamburgerIcon.classList.remove("active")
      mobileMenuButton.setAttribute("aria-expanded", "false")
      mobileMenuButton.setAttribute("aria-label", "メニューを開く")
    }
  }

  // モバイルメニューを閉じる
  function closeMobileMenu() {
    if (!mobileMenu || !hamburgerIcon) return

    mobileMenu.classList.add("hidden")
    hamburgerIcon.classList.remove("active")
    mobileMenuButton.setAttribute("aria-expanded", "false")
    mobileMenuButton.setAttribute("aria-label", "メニューを開く")
  }

  // イベントリスナーを追加
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu)
  }

  // メニューリンクをクリックしたときにメニューを閉じる
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // 現在の年を設定
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // メニュー外をクリックしたときにメニューを閉じる
  document.addEventListener("click", (event) => {
    if (!mobileMenu || !mobileMenuButton) return

    const isClickInsideMenu = mobileMenu.contains(event.target)
    const isClickOnButton = mobileMenuButton.contains(event.target)
    const isMenuOpen = !mobileMenu.classList.contains("hidden")

    if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
      closeMobileMenu()
    }
  })

  // スムーススクロール
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = 80 // ヘッダーの高さを考慮
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})
