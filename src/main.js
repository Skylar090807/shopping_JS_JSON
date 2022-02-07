// 최종 목표
// 아래 코드가 실행 될 수 있도록 하라.
/*  loadItems()
      .then(items => {
        displayItems(itmes)
        setEventListeners(items)
      })
      .catch(console.log)
*/

// 1. JSON file의 items를 fetch로 가져오기.
function loadItems() {
  return (
    fetch('../data/data.json') //
      .then((response) => response.json()) //fetch 경로에서 불러오는 것이 성공하면 response로 받아온 것을 json()으로 변환.
      // .then((json) => console.log(json)) // console에 확인하면 json파일에 작성한 items들이 array형식으로 받아진 것을 확인 할 수 있다.
      .then((json) => json.items)
    // .then((items) => console.log(items)) // 받아 온 items 확인
  )
}

//  2. document.querySelector를 이용하여 html에 작성한 클래스 명을 불러온다
// 해당 태그 안에 innerHTML을 활용하여 받아 온 items를 item으로 받아 와 새로운 배열로 만들기 위해 map() 돌려주고
// createHTMLString(item) 함수를 만든다. item을 인자로 받아와, HTML element를 동적으로 만들어준 뒤
// join()을 이용해 배열을 문자열로 반환하고 구분자는 ('') 공백으로 한다.
function displayItems(items) {
  const container = document.querySelector('.items')
  // const html = items.map((item) => createHTMLString(item)).join('')
  // console.log(html) // map(), join() 동작 console.log()로 확인하기.
  container.innerHTML = items.map((item) => createHTMLString(item)).join('')
}

// 3. HTML elements를 동적으로 만든다.
// 백틱을 이용해 받아 온 item 안의 key값을 원하는 곳에 불러준다.
function createHTMLString(item) {
  return `
    <div class="item">
      <img src="${item.image}" alt="${item.type}" class="item__image" />
      <span class="item__info">${item.gender}, ${item.size}</span>
    </div>
  `
}

// 5. 클릭되면 event가 발생한 것을 인자로 전달해주고, items도 전달 해준다.
// 이벤트를 처리하는 함수를 만들 때 on~~ 으로 명명한다.
function onButtonClick(event, items) {
  // console.log(event.target.dataset.key)
  // console.log(event.target.dataset.value) // html에 작성한 dataset을 console에서 확인.
  const dataset = event.target.dataset //반복해서 길게 부르지 않도록 변수로 선언한다.
  const key = dataset.key
  const value = dataset.value

  if (key == null || value == null) {
    return // key, value가 null이면 아무 것도 처리하지 않고 함수를 끝낸다.
  }
  displayItems(items.filter((item) => item[key] === value)) //🟣 이렇게 해도 잘 작동하지만 성능이 좋지 않다.
  // const filter = items.filter((item) => item[key] === value)
  // console.log(filter) // filter() 동작 확인.
}

// 4. html에 만들어 둔 버튼을 클릭했을 때 해당하는 데이터를 보여준다.
function setEventListeners(items) {
  const logo = document.querySelector('.logo')
  const nav = document.querySelector('nav') // button 각각에 이벤트를 등록하는 것이 아니라 버튼들을 감싸고 있는 태그에 이벤트를 위임해서 한꺼번에 핸들링.
  logo.addEventListener('click', () => displayItems(items)) // logo가 클릭되면 모든 아이템들이 보여진다
  nav.addEventListener('click', (event) => onButtonClick(event, items)) // onButtonClick이란 함수를 만들어 클릭되면 event가 발생한 것을 인자로 전달해주고, items도 전달 해준다.
}

//목표
loadItems()
  .then((items) => {
    console.log(items)
    displayItems(items)
    setEventListeners(items)
  })
  .catch(console.log)
