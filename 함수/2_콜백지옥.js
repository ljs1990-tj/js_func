// ============================================================================
// 🍔 자바스크립트 비동기 탈출기: 콜백 지옥 -> Promise -> Async/Await
// ============================================================================

// 상황: 햄버거를 만들기 위해 4가지 작업(빵 굽기 -> 패티 굽기 -> 야채 올리기 -> 포장)을
// 반드시 '순서대로' 진행해야 합니다. 각 작업은 1초(1000ms)씩 걸린다고 가정합니다.

// ----------------------------------------------------------------------------
// 😱 1. 콜백 지옥 (Callback Hell)의 모습
// ----------------------------------------------------------------------------
// 옛날 방식의 함수들 (콜백을 받아서 작업이 끝나면 실행해 줍니다)
function prepareBread(callback) {
    setTimeout(() => { console.log("1. 🍞 빵 굽기 완료!"); callback(); }, 1000);
}
function cookPatty(callback) {
    setTimeout(() => { console.log("2. 🥩 패티 굽기 완료!"); callback(); }, 1000);
}
function addVeggies(callback) {
    setTimeout(() => { console.log("3. 🥬 야채 올리기 완료!"); callback(); }, 1000);
}
function packageBurger(callback) {
    setTimeout(() => { console.log("4. 🎁 햄버거 포장 완료! (콜백 방식 끝)\n"); callback(); }, 1000);
}

// 🚨 콜백 지옥 발생!
// 순서를 맞추기 위해 함수 안에 함수를 계속 밀어 넣다 보니,
// 코드가 오른쪽으로 점점 파고들어 가는 '>' 모양(피라미드)이 되어버렸습니다.
console.log("--- [1단계: 콜백 지옥 시작] ---");
prepareBread(() => {
    cookPatty(() => {
        addVeggies(() => {
            packageBurger(() => {
                console.log("✅ 옛날 방식 햄버거 완성!");
            });
        });
    });
});


// ----------------------------------------------------------------------------
// 🎫 2. 지옥 탈출 1단계: Promise (프로미스)
// ----------------------------------------------------------------------------
// "지금은 결과가 없지만, 끝나면 이 '교환권(Promise)'으로 성공/실패를 알려줄게!"

// Promise를 반환하도록 함수를 업그레이드합니다. (resolve는 성공 시 호출하는 콜백입니다)
function makeBreadPro() {
    return new Promise((resolve) => {
        setTimeout(() => { console.log("1. 🍞 빵 굽기 완료!"); resolve(); }, 1000);
    });
}
function cookPattyPro() {
    return new Promise((resolve) => {
        setTimeout(() => { console.log("2. 🥩 패티 굽기 완료!"); resolve(); }, 1000);
    });
}
function addVeggiesPro() {
    return new Promise((resolve) => {
        setTimeout(() => { console.log("3. 🥬 야채 올리기 완료!"); resolve(); }, 1000);
    });
}
function packageBurgerPro() {
    return new Promise((resolve) => {
        setTimeout(() => { console.log("4. 🎁 햄버거 포장 완료! (Promise 방식 끝)\n"); resolve(); }, 1000);
    });
}

// 🌟 Promise 사용! (위의 콜백 지옥 코드를 모두 주석 처리하고 실행해야 순서가 안 꼬입니다)
// .then()을 사용해서 코드가 오른쪽으로 파고들지 않고, 아래로 평평하게 이어집니다.
/* 
console.log("--- [2단계: Promise 시작] ---");
makeBreadPro()
    .then(() => cookPattyPro())   // 빵이 다 되면 패티를 구워!
    .then(() => addVeggiesPro())  // 패티가 다 되면 야채를 올려!
    .then(() => packageBurgerPro()) // 야채가 다 되면 포장해!
    .then(() => {
        console.log("✅ Promise 방식 햄버거 완성!");
    })
    .catch((error) => {
        // 중간에 하나라도 실패하면 여기서 에러를 한 번에 잡습니다.
        console.log("❌ 햄버거 만들기 실패:", error);
    });
*/


// ----------------------------------------------------------------------------
// ✨ 3. 지옥 탈출의 최종 진화: Async / Await
// ----------------------------------------------------------------------------
// Promise도 훌륭하지만, 코드를 더더욱 '일반적인 순서'처럼 보이게 만드는 현대인의 마법입니다.
// ※ 위에서 만든 Promise 반환 함수(makeBreadPro 등)를 그대로 재사용합니다.

// 함수 앞에 'async'를 붙여서 "이 안에서 일시정지(await) 마법을 쓸 거야!" 라고 허락을 받습니다.
async function makePerfectBurger() {
    console.log("--- [3단계: Async/Await 시작] ---");
    
    // try-catch 블록으로 감싸서 혹시 모를 에러에 대비합니다. (안전장치)
    try {
        // await를 쓰면, 이 작업이 끝날 때까지 알아서 기다렸다가 다음 줄로 넘어갑니다!
        await makeBreadPro();   // 1초 대기... 완료되면 다음 줄로!
        await cookPattyPro();   // 1초 대기...
        await addVeggiesPro();  // 1초 대기...
        await packageBurgerPro(); // 1초 대기...
        
        console.log("✅ Async/Await 방식 햄버거 완성!");
    } catch (error) {
        // 중간에 에러가 나면 프로그램이 멈추지 않고 이쪽으로 빠져나옵니다.
        console.log("❌ 에러 발생! 원인:", error);
    }
}

// 최종 진화형 함수 실행!
// (※ 콜백과 Promise 예시가 헷갈리지 않게, 실제 테스트 시에는 위의 예시들을 주석 처리 후 실행해 보세요)
// makePerfectBurger();