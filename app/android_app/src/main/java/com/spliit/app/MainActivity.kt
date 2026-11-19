package com.spliit.app

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat

/**
 * web/shared의 화면·기능을 그대로 띄우는 WebView 앱.
 * assets/www 는 빌드 시 app/www + web/shared 로 자동 생성된다 (android_app/build.gradle.kts 참고).
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // file:// 대신 https 가상 도메인으로 assets를 제공해 웹과 같은 보안 환경에서 동작시킨다.
        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            webChromeClient = WebChromeClient() // alert() 표시
            webViewClient = object : WebViewClientCompat() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest
                ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)

                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    // 앱 내부 페이지는 WebView에서, 그 밖의 링크는 외부 브라우저로 연다.
                    if (request.url.host == APP_HOST) return false
                    startActivity(Intent(Intent.ACTION_VIEW, request.url))
                    return true
                }
            }
        }
        setContentView(webView)

        // 뒤로가기: 홈 화면이면 앱 종료, 아니면 웹의 goBack() 호출
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                webView.evaluateJavascript(
                    "(function(){var s=document.querySelector('.screen.active');return s?s.id:'';})()"
                ) { result ->
                    if (result == "\"screen-home\"" || result == "\"\"" || result == "null") {
                        finish()
                    } else {
                        webView.evaluateJavascript("goBack()", null)
                    }
                }
            }
        })

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(START_URL)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }

    companion object {
        private const val APP_HOST = "appassets.androidplatform.net"
        private val START_URL = Uri.parse("https://$APP_HOST/assets/www/index.html").toString()
    }
}
