// CodePipeline S3 Demo JavaScript - v2.1.1 OAuth Connection Test

document.addEventListener('DOMContentLoaded', function() {
    // 現在の日時を表示
    updateTimestamp();
    
    // 5秒ごとにタイムスタンプを更新
    setInterval(updateTimestamp, 5000);
    
    // デプロイ成功のアニメーション
    animateDeployStatus();
    
    // OAuth修正テスト情報をログ出力
    console.log('🔧 OAuth Connection Fixed - v2.1.1 - ' + new Date().toISOString());
});

function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    const now = new Date();
    const formattedTime = now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    if (timestampElement) {
        timestampElement.textContent = `最終更新: ${formattedTime}`;
    }
}

function animateDeployStatus() {
    const badge = document.querySelector('.badge.success');
    if (badge) {
        // フェードインアニメーション
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'all 0.5s ease-in-out';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 100);
    }
}

// GitHub情報を表示（実際のデプロイ時に使用）
function displayGitHubInfo() {
    const gitCommit = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION || 'local';
    const gitBranch = process.env.CODEBUILD_SOURCE_VERSION || 'main';
    
    console.log('Git Commit:', gitCommit);
    console.log('Git Branch:', gitBranch);
}

// CodeBuild環境変数の表示（デバッグ用）
function displayBuildInfo() {
    if (typeof process !== 'undefined' && process.env) {
        console.log('Build Info:', {
            buildId: process.env.CODEBUILD_BUILD_ID,
            projectName: process.env.CODEBUILD_PROJECT_NAME,
            region: process.env.AWS_DEFAULT_REGION
        });
    }
}
