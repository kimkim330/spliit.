plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.spliit.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.spliit.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }

    // web과 같은 화면·기능을 쓰기 위해, 빌드할 때 생성한 웹 자산 폴더를 assets로 사용한다.
    sourceSets["main"].assets.srcDir(layout.buildDirectory.dir("generated/webAssets"))
}

// app/www(앱 레이아웃) + web/shared(공통 화면·기능)를 assets/www로 모은다.
// web/shared를 고치면 다음 APK 빌드에 자동으로 반영된다.
val syncWebAssets by tasks.registering(Sync::class) {
    from(rootProject.file("www"))
    from(rootProject.file("../web/shared")) { into("shared") }
    into(layout.buildDirectory.dir("generated/webAssets/www"))
    filesMatching("**/*.html") {
        filter { line -> line.replace("../../web/shared/", "./shared/") }
    }
}
tasks.named("preBuild") { dependsOn(syncWebAssets) }

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.activity:activity-ktx:1.9.3")
    implementation("androidx.webkit:webkit:1.12.1")
}
