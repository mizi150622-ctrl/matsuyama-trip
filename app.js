'use strict';
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const mapUrl = place => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place);
const routePlace = stop => stop.routePlace || stop.info[4];
const directionsUrl = (from, to) => 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(routePlace(from)) + '&destination=' + encodeURIComponent(routePlace(to));
function routeLink(from, to) {
 if (!to) return '';
 const label = `${from.info[2]}에서 ${to.info[2]}까지 길찾기, 구글지도 새 창`;
 return `<a class="timeline-route" href="${directionsUrl(from, to)}" target="_blank" rel="noopener" aria-label="${label}" title="${label}"><span class="route-arrow" aria-hidden="true">↓</span></a>`;
}
const days = [
 {id:1,date:'12월 3일 목요일',title:'온천마을에서, 느긋한 첫날',description:'도고에 짐을 맡기고 점심부터 시작해요. 오후에는 료칸에서 푹 쉬어요.',image:'assets/dogo-honkan.webp',alt:'도고온천 본관의 전통 목조 건물',route:['도고 점심','공원·상점가','도고칸','저녁 산책'],stay:'도고칸 · 첫 번째 밤',stayNote:'저녁·조식 포함 여부 확인',tipTitle:'온천은 숙소에서 여유 있게',tip:'도고칸에서도 도고온천을 즐길 수 있어요. 본관 입욕까지 하고 싶으면 산책 한 곳과 바꿔요. 소라노산포미치에서는 본관 전망과 무료 족욕을 즐길 수 있어요.',stops:[
  {id:'d1-akiyoshi',info:['12:00','점심','아키요시 도고점','따뜻한 마쓰야마식 도미솥밥으로 여행의 첫 끼를 먹어요.','松山鯛めし 秋嘉 道後店 松山市道後湯之町12-34','점심 주문 마감 14:30 · 예약 불가','meal']},
  {id:'d1-dogo-park',info:['13:00','산책','도고공원','해자와 녹지를 따라 30~40분 정도 가볍게 걸어요.','道後公園 松山市','피곤하면 공원을 건너뛰고 상점가만 둘러봐도 좋아요.']},
  {id:'d1-dogo-honkan',info:['14:00','구경','도고온천 본관·상점가','본관 앞에서 사진을 찍고, 귤 간식과 기념품을 구경해요.','道後温泉本館 松山市','본관 내부 입욕은 선택이에요.']},
  {id:'d1-dogokan-checkin',info:['15:00','휴식','도고칸 체크인·온천','따뜻한 물에 몸을 풀고 방에서 쉬어요.','道後舘 松山市道後多幸町7-26','체크인 시간은 예약 상품을 확인해요.']},
  {id:'d1-dogokan-dinner',info:['18:00','저녁','도고칸 가이세키','석식 포함 상품이면 료칸에서 저녁을 먹어요.','道後舘 松山市道後多幸町7-26','석식 미포함이면 스시마루 도고점으로 바꿀 수 있어요.','meal']},
  {id:'d1-evening-walk',info:['19:30','선택','온천마을 저녁 산책','식사 후 본관 주변을 짧게 걸어요. 피곤하면 숙소에서 쉬어요.','道後温泉本館 松山市','무리해서 외출하지 않아도 괜찮아요.']}
 ]},
 {id:2,date:'12월 4일 금요일',title:'성을 둘러보고, 시내를 맛봐요',description:'숙소를 옮긴 뒤 성부터 둘러봐요. 오후에는 카페와 호텔에서 쉬어가요.',image:'assets/matsuyama-castle.webp',alt:'돌담 위에 자리한 마쓰야마성 천수각',route:['칸데오 짐 보관','마쓰야마성','도미밥·반스이소','고시키'],stay:'칸데오 호텔 · 두 번째 밤',stayNote:'체크인 15:00부터',tipTitle:'로프웨이를 타도 조금 걸어요',tip:'산 정상 정류장에서 천수각까지 약 10분 더 걸어요. 내부 계단이 부담스러우면 성곽과 전망 위주로 봐요. 12월 천수각 입장 마감은 16:00예요.',stops:[
  {id:'d2-breakfast',routePlace:'道後舘 松山市道後多幸町7-26',info:['08:00','아침','조식·마지막 온천','숙소에서 아침을 먹고 출발 준비를 해요.','','조식 포함 여부는 예약 확인','meal']},
  {id:'d2-luggage',info:['10:00','이동','칸데오 호텔에 짐 맡기기','도고칸 체크아웃 후 시내 숙소로 이동해요. 캐리어가 있으면 택시가 편해요.','カンデオホテルズ松山大街道','전차 이용 시 도고온천역 → 오카이도, 약 12분 + 도보']},
  {id:'d2-castle',info:['10:45','관광','마쓰야마성','로프웨이로 올라가 성곽과 시내 전망을 둘러봐요. 약 2시간을 잡아요.','松山城ロープウェイ 東雲口駅','지도는 로프웨이 아래쪽 승강장으로 연결돼요.']},
  {id:'d2-kadoya',info:['13:00','점심','카도야 로프웨이거리점','도미회와 날달걀 양념을 곁들이는 우와지마 도미밥을 맛봐요.','かどや ロープウェー街店 松山市大街道3-7-4','날것을 안 드시면 익힌 메뉴로 골라요.','meal']},
  {id:'d2-bansuiso',info:['14:00','구경·간식','상점가 → 반스이소','10 FACTORY에서 귤 주스나 젤라토를 먹고, 숲 옆 서양식 저택을 구경해요.','萬翠荘 松山市','카페와 저택 관람은 컨디션에 맞게 조절해요.']},
  {id:'d2-hotel-rest',info:['15:30','휴식','호텔 체크인·쉬는 시간','저녁 전에 숙소에서 한두 시간 편하게 쉬어요.','カンデオホテルズ松山大街道','']},
  {id:'d2-goshiki',info:['18:00','저녁','고시키','도미 소면과 자코텐 등 에히메 향토음식을 골라 먹어요.','郷土料理 五志喜 松山市三番町3-5-4','금요일 저녁 예약 추천 · 예약 전','meal']}
 ]},
 {id:3,date:'12월 5일 토요일',title:'항구를 걷다가, 바다 앞 쉼표',description:'미쓰하마에서 점심을 먹고 바이신지로 가요. 바다와 카페를 함께 즐겨요.',image:'assets/baishinji-sea.webp',alt:'바이신지역 플랫폼 너머 해 질 무렵의 바다',route:['미쓰하마 점심','항구·나룻배','바이신지 바다','시내 초밥'],stay:'칸데오 호텔 · 세 번째 밤',stayNote:'숙소 이동 없이 편하게 쉬어요',tipTitle:'바다 코스는 날씨 좋은 날에',tip:'사진은 바이신지의 노을 풍경이에요. 기본 일정은 오후 방문이에요. 바람이나 비가 심하면 바닷가 대신 시내 카페·쇼핑으로 바꿔요. 나룻배는 악천후에 멈출 수 있어요.',stops:[
  {id:'d3-breakfast',routePlace:'カンデオホテルズ松山大街道',info:['08:30','아침','호텔 조식','점심이 든든한 메뉴라 아침은 가볍게 먹어요.','','조식은 예약 포함 여부 확인','meal']},
  {id:'d3-mitsu-station',info:['10:00','이동','미쓰역으로 출발','오카이도에서 마쓰야마시역으로 이동한 뒤, 다카하마선 전철을 타요.','三津駅 伊予鉄道 松山市','JR 마쓰야마역과 이요테쓰 마쓰야마시역을 구분해요.']},
  {id:'d3-hinode',info:['11:00','점심','히노데','면과 여러 재료를 겹쳐 구운 미쓰하마야키를 먹어요.','お好み焼 日の出 松山市三杉町11-8','개점 시간에 맞춰 방문 · 수요일 정기 휴무','meal']},
  {id:'d3-port-ferry',info:['12:00','산책','미쓰하마 항구·미쓰노와타시','항구 골목을 구경하고 짧은 무료 나룻배를 타고 건너가요.','三津の渡し 三津側乗り場','나룻배 07:00~19:00 수시 운항 · 악천후 중단 가능']},
  {id:'d3-baishinji-station',info:['13:30','이동','바이신지역','미나토야마역에서 전철로 이동해 바다를 만나요.','梅津寺駅 松山市','걷는 양을 줄이려면 역 사이를 전철로 이동해요.']},
  {id:'d3-beach-cafe',info:['14:00','바다·카페','바이신지 해변·미캰파크','바다를 바라보고, 카페에서 귤 디저트를 먹으며 쉬어요.','みきゃんパーク梅津寺','토요일 카페 주문 마감 16:30 · 영업 종료 17:00']},
  {id:'d3-hotel-rest',info:['15:30','휴식','시내 복귀·호텔 휴식','몸이 피곤하면 숙소로, 여유가 있으면 주변 상점가를 둘러봐요.','カンデオホテルズ松山大街道','']},
  {id:'d3-sushimaru',info:['18:00','저녁','스시마루 본점','니기리즈시나 마쓰야마즈시로 마지막 저녁을 즐겨요.','すし丸 本店 松山市二番町2-3-2','토요일 저녁 예약 추천 · 예약 전','meal']}
 ]},
 {id:4,date:'12월 6일 일요일',title:'따뜻한 우동 한 그릇, 그리고 귀국',description:'숙소 근처에서 가볍게 둘러보고 이른 점심을 먹어요. 출발 시간은 항공편에 맞춰요.',image:null,route:['아침·짐 정리','쇼핑','고토리 우동','공항'],stay:'오늘은 집으로 돌아가는 날',stayNote:'호텔 기본 체크아웃 11:00',tipTitle:'항공편 시간을 먼저 확인해요',tip:'이 일정은 시내에서 점심을 먹고 출국할 수 있는 항공편을 가정했어요. 국제선 출발 2시간 전에는 공항에 도착하도록 출발 시간을 조정해요.',stops:[
  {id:'d4-breakfast',routePlace:'カンデオホテルズ松山大街道',info:['08:00','아침','호텔에서 가벼운 아침','마지막 짐을 정리하고 천천히 준비해요.','','우동 점심을 생각해 가볍게 먹어요.','meal']},
  {id:'d4-checkout',info:['09:30','짐 보관','체크아웃 후 짐 맡기기','호텔에 짐을 맡긴 뒤 근처 상점가로 나가요.','カンデオホテルズ松山大街道','체크아웃 후 짐 보관은 프런트에 요청해요.']},
  {id:'d4-shopping',info:['10:00','쇼핑','오카이도·긴텐가이','가게가 여는 시간에 맞춰 간식과 기념품을 골라요.','松山銀天街商店街','너무 멀리 이동하지 않고 숙소 근처에서 마무리해요.']},
  {id:'d4-kotori',info:['10:45','이른 점심','고토리','따뜻한 나베야키우동과 이나리즈시로 마지막 한 끼를 먹어요.','鍋焼きうどん ことり 松山市湊町3-7-2','10:00~14:00 · 재료 소진 시 종료 · 부정기 휴무 가능','meal']},
  {id:'d4-airport',info:['11:30','귀국 준비','짐 찾고 공항으로 이동','호텔에서 짐을 찾은 뒤 택시나 공항버스로 이동해요.','松山空港','공항 이동 약 30분에 대기·교통 여유를 더해요. 항공편 시간에 따라 앞당겨요.']}
 ]}
];
const foods = [
 ['3일 점심','아키요시 도고점','秋嘉 道後店','도미와 밥을 함께 익혀 따뜻하게 내는 솥밥. 도고에 도착한 첫 끼로 좋아요.','마쓰야마식 도미솥밥','점심 주문 마감 14:30 · 예약 불가','松山鯛めし 秋嘉 道後店 松山市道後湯之町12-34'],
 ['4일 점심','카도야 로프웨이거리점','かどや ロープウェー街店','성 구경을 마치고 들르기 좋은 식당. 전날과 다른 방식의 도미밥을 맛봐요.','우와지마식 도미밥','도미회·날달걀 사용 · 기호에 맞게 선택','かどや ロープウェー街店 松山市大街道3-7-4'],
 ['4일 저녁','고시키','五志喜','도미 소면부터 지역 어묵까지, 에히메 향토음식을 여러 가지 골라요.','도미 소면 · 자코텐','금요일 저녁 예약 추천 · 부정기 휴무','郷土料理 五志喜 松山市三番町3-5-4'],
 ['5일 점심','히노데','日の出','면과 양배추, 고기 등을 겹쳐 굽는 항구마을의 든든한 한 끼예요.','미쓰하마야키','11:00 개점 · 수요일 휴무','お好み焼 日の出 松山市三杉町11-8'],
 ['5일 저녁','스시마루 본점','すし丸 本店','지역 초밥이나 니기리즈시를 먹으며 마지막 저녁을 여유 있게 보내요.','마쓰야마즈시 · 니기리즈시','토요일 저녁 예약 추천','すし丸 本店 松山市二番町2-3-2'],
 ['6일 이른 점심','고토리','ことり','작은 냄비에 담긴 따뜻한 우동. 출발 전 이른 점심으로 먹어요.','나베야키우동 · 이나리즈시','10:00~14:00 · 소진 시 종료 · 수요일 휴무','鍋焼きうどん ことり 松山市湊町3-7-2']
];
const sources = [
 ['도고온천 공식 안내','https://dogo.jp/'],['마쓰야마성 관람 안내','https://www.matsuyamajo.jp/en/guide.html'],['반스이소','https://www.bansuisou.org/'],['도고칸','https://www.dogokan.co.jp/ko/'],['칸데오 호텔','https://www.candeohotels.com/ja/ehime-matsuyama/access/'],
 ['아키요시 도고점','https://w-harmony.jp/shop/akiyoshi-dogo/'],['카도야 매장 안내','https://www.kadoya-taimeshi.com/kadoyamanage/shoplist/'],['고시키','https://s422500.gorp.jp/'],['히노데·미쓰하마야키','https://www.mitsuhamaru.com/mitsuhamayaki/shop/'],['스시마루','https://www.sushimaru.co.jp/'],['고토리 관광 안내','https://matsuyama-sightseeing.com/topics/trip_family02/'],
 ['미쓰노와타시','https://www.city.matsuyama.ehime.jp/shisetsu/kuko/mituwatasi.html'],['미캰파크 영업 안내','https://mican-park.jp/info/?p=1481'],['시모나다역','https://www.iyokannet.jp/spot/3580'],['후타미 해안','https://iyokankou.jp/spot/spot-1869/'],
 ['사진: 도고온천 본관 / 마쓰야마시 관광정보','https://matsuyama-sightseeing.com/spot/12-2/'],['사진: 마쓰야마성 / 마쓰야마시 관광정보','https://matsuyama-sightseeing.com/spot/1-2/'],['사진: 바이신지역 / 마쓰야마시 관광정보','https://matsuyama-sightseeing.com/spot/58-2/']
];
// Keep stop IDs stable when adjusting times or descriptions so personal notes stay attached.
const notePrefix = 'matsuyama-2026-note-v1:';
const noteDrafts = new Map();
function readNote(id) {
 const draft = noteDrafts.get(id);
 // Preserve unsaved text if browser storage is temporarily unavailable.
 if (draft && !draft.saved) return draft;
 try {
  return {value: localStorage.getItem(notePrefix + id) || '', saved: true};
 } catch {
  return {value: draft ? draft.value : '', saved: false};
 }
}
function connectNotes(panel) {
 panel.querySelectorAll('[data-note-id]').forEach(field => {
  const id = field.dataset.noteId;
  const status = document.getElementById('memo-status-' + id);
  const showStatus = (note, edited = false) => {
   status.classList.toggle('memo-error', !note.saved);
   status.textContent = !note.saved
    ? '이 기기에 저장하지 못했어요. 닫기 전에 메모를 복사해 주세요.'
    : note.value ? '✓ 이 기기에 저장했어요.'
    : edited ? '메모를 지웠어요.' : '입력하면 자동으로 저장돼요.';
  };
  const note = readNote(id);
  field.value = note.value;
  showStatus(note);
  field.addEventListener('input', () => {
   const changed = {value: field.value, saved: false};
   noteDrafts.set(id, changed);
   try {
    if (changed.value) localStorage.setItem(notePrefix + id, changed.value);
    else localStorage.removeItem(notePrefix + id);
    changed.saved = true;
   } catch {}
   showStatus(changed, true);
  });
 });
}
function renderDay(id, save = true) {
 const day = days.find(d => d.id === id) || days[0];
 document.querySelectorAll('[role="tab"]').forEach(button => {
  const selected = Number(button.dataset.day) === day.id;
  button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1;
 });
 const panel = document.getElementById('day-panel'); panel.setAttribute('aria-labelledby', 'tab-' + day.id);
 panel.innerHTML = `<div class="day-intro ${day.image ? '' : 'no-image'}"><div class="day-intro-copy"><p class="day-count">DAY 0${day.id} · ${day.date}</p><h3>${day.title}</h3><p class="description">${day.description}</p><div class="route-line" aria-label="이동 순서">${day.route.map((r,i)=>`${i?'<i aria-hidden="true">→</i>':''}<span>${r}</span>`).join('')}</div></div>${day.image?`<img src="${day.image}" alt="${day.alt}" width="520" height="360">`:''}</div>
 <p class="timeline-help"><span aria-hidden="true">↓</span> 시간 사이의 선이나 화살표를 누르면<br class="mobile-break"> 다음 장소까지 구글맵 길찾기가 열려요.</p>
 <div class="day-layout"><ol class="timeline">${day.stops.map(({id:stopId,info:s},index)=>`<li class="stop ${s[6]||''}">${routeLink(day.stops[index], day.stops[index+1])}<div class="stop-time">${s[0]}<small>예상</small></div><div><span class="stop-category">${s[1]}</span><h4>${s[2]}</h4><p>${s[3]}</p>${s[5]?`<p class="small-note">${s[5]}</p>`:''}${s[4]?`<a class="map-button" href="${mapUrl(s[4])}" target="_blank" rel="noopener" aria-label="${s[2]} 구글지도 보기, 새 창">${icon('pin')}지도 보기</a>`:''}<details class="stop-memo"><summary class="memo-toggle"><span class="memo-arrow" aria-hidden="true">▶</span>엄마의 의견!</summary><div class="memo-content"><label class="visually-hidden" for="memo-${stopId}">${day.date} ${s[0]} ${s[2]} 엄마의 의견</label><textarea id="memo-${stopId}" data-note-id="${stopId}" rows="3" placeholder="먹고 싶은 메뉴나 기억할 일을 적어 주세요." aria-describedby="memo-storage-info memo-status-${stopId}"></textarea><p id="memo-status-${stopId}" class="memo-status" role="status" aria-live="polite"></p></div></details></div></li>`).join('')}</ol></div>`;
 connectNotes(panel);
 showDayWeather(day);
 if(save) { try { localStorage.setItem('matsuyama-day', String(day.id)); } catch {} }
}
document.querySelectorAll('[role="tab"]').forEach(button => {
 button.addEventListener('click', () => renderDay(Number(button.dataset.day)));
 button.addEventListener('keydown', event => {
  const tabButtons = [...document.querySelectorAll('[role="tab"]')];
  let index = tabButtons.indexOf(button);
  if(event.key === 'ArrowRight') index = (index+1)%4;
  else if(event.key === 'ArrowLeft') index = (index+3)%4;
  else if(event.key === 'Home') index = 0;
  else if(event.key === 'End') index = 3;
  else return;
  event.preventDefault(); renderDay(index+1); tabButtons[index].focus();
 });
});
document.getElementById('food-grid').innerHTML = foods.map((f,i)=>`<article class="food-card"><div class="food-card-top"><span class="meal-day">${f[0]}</span><span aria-hidden="true">0${i+1}</span></div><h3>${f[1]}</h3><p class="jp-name">${f[2]}</p><p class="food-desc">${f[3]}</p><p class="dish-label">${f[4]}</p><p class="food-meta">${f[5]}</p><a class="button outline" href="${mapUrl(f[6])}" target="_blank" rel="noopener" aria-label="${f[1]} 구글지도 보기, 새 창">지도 보기 ${icon('pin')}</a></article>`).join('');
document.querySelectorAll('.map-link').forEach(link => {link.href=mapUrl(link.dataset.place);link.setAttribute('aria-label',link.textContent.trim()+', 구글지도 새 창');});
document.getElementById('sources-list').innerHTML=sources.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]} ↗</a>`).join('');
let toastTimer;
function toast(message){const element=document.getElementById('toast');element.textContent=message;element.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>element.classList.remove('show'),3500);}
function setFont(large){document.body.classList.toggle('large-type',large);document.getElementById('font-toggle').setAttribute('aria-pressed',String(large));document.getElementById('font-label').textContent=large?'기본 글씨':'글씨 크게';try{localStorage.setItem('matsuyama-font',large?'large':'normal');}catch{}}
document.getElementById('font-toggle').addEventListener('click',()=>setFont(!document.body.classList.contains('large-type')));
document.getElementById('share-button').addEventListener('click',async()=>{
 const url=location.href.split('#')[0];
 if(navigator.share){try{await navigator.share({title:'엄마랑, 마쓰야마 🍊',text:'12월 3일–6일, 우리 둘의 여행 일정이에요.',url});return;}catch(error){if(error.name==='AbortError')return;}}
 document.getElementById('share-url').value=url;document.getElementById('share-dialog').showModal();
});
document.getElementById('copy-url').addEventListener('click',async()=>{
 const input=document.getElementById('share-url');
 try{await navigator.clipboard.writeText(input.value);document.getElementById('share-dialog').close();toast('주소를 복사했어요. 카카오톡에 붙여넣어 주세요.');}
 catch{input.focus();input.select();toast('주소를 길게 눌러 복사해 주세요.');}
});
document.getElementById('close-dialog').addEventListener('click',()=>document.getElementById('share-dialog').close());
let initialDay=1;
try{const stored=Number(localStorage.getItem('matsuyama-day'));if(stored>=1&&stored<=4)initialDay=stored;setFont(localStorage.getItem('matsuyama-font')==='large');}catch{}
renderDay(initialDay,false);
