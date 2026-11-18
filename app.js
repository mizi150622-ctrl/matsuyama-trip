'use strict';
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const mapUrl = place => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place);
const routePlace = stop => stop.routePlace || stop.info[4];
const directionsUrl = (from, to) => 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(routePlace(from)) + '&destination=' + encodeURIComponent(routePlace(to)) + (to.travelMode === 'driving' ? '&travelmode=driving' : '');
function routeLink(from, to) {
 if (!to) return '';
 const label = `${from.info[2]}에서 ${to.info[2]}까지 길찾기, 구글지도 새 창`;
 return `<a class="timeline-route" href="${directionsUrl(from, to)}" target="_blank" rel="noopener" aria-label="${label}" title="${label}"><span class="route-arrow" aria-hidden="true">↓</span></a>`;
}
const days = [
 {id:1,date:'12월 3일 목요일',title:'오후에 도착해, 온천에서 쉬어요',description:'14:40 마쓰야마 도착 후 입국 수속을 마치고 도고칸으로 이동해요. 점심은 인천공항에서 출발 전에 먹어요.',flight:'제주항공 7C1703 · 인천 T1 13:05 → 마쓰야마 14:40',image:'assets/dogo-honkan.webp',alt:'도고온천 본관의 전통 목조 건물',route:['14:40 공항 도착','도고칸·온천','료칸 저녁','선택: 밤 산책'],stay:'도고칸 · 첫 번째 밤',stayNote:'저녁·조식 포함 여부 확인',tipTitle:'첫날은 숙소에서 여유 있게',tip:'입국과 수하물 수령에 45~60분을 예상해요. 공항에서 도고까지 차로 약 40분이므로 체크인은 16:15 전후로 잡아요. 지연되면 산책을 생략하고 숙소에서 쉬어요.',stops:[
  {id:'d1-arrival',fixedTime:true,info:['14:40','일본 도착','마쓰야마공항 도착·입국','제주항공 7C1703으로 도착해 입국 수속과 수하물 수령을 해요. 15:30~15:45 전후 공항 출발을 예상해요.','松山空港','입국 대기에 따라 달라져요. 공항에서 도고까지 차로 약 40분이에요.']},
  {id:'d1-dogokan-checkin',info:['16:15','휴식','도고칸 체크인·온천','숙소로 이동해 짐을 풀고, 따뜻한 온천과 방에서 여유 있게 쉬어요.','道後舘 松山市道後多幸町7-26','공항에서 택시로 바로 이동하는 기준의 예상 시각이에요.']},
  {id:'d1-dogokan-dinner',info:['18:00','저녁','도고칸 가이세키','석식 포함 상품이면 료칸에서 저녁을 먹어요. 정확한 식사 시간은 체크인할 때 맞춰요.','道後舘 松山市道後多幸町7-26','석식 미포함이면 스시마루 도고점 등 주변 식당으로 바꿔요.','meal']},
  {id:'d1-evening-walk',info:['19:30','선택','도고온천 본관·온천마을 밤 산책','식사 후 본관 야경을 보고 숙소로 돌아와요. 피곤하면 산책을 생략해도 좋아요.','道後温泉本館 松山市','상점은 저녁에 닫을 수 있어요. 오늘은 야경과 짧은 산책 위주로 즐겨요.']}
 ]},
 {id:2,date:'12월 4일 금요일',title:'성을 둘러보고, 시내를 맛봐요',description:'숙소를 옮긴 뒤 성부터 둘러봐요. 오후에는 카페와 호텔에서 쉬고, 17:30에 아키요시 본점에서 저녁을 먹어요.',image:'assets/matsuyama-castle.webp',alt:'돌담 위에 자리한 마쓰야마성 천수각',route:['칸데오 짐 보관','마쓰야마성','도미밥·반스이소','아키요시 본점'],stay:'칸데오 호텔 · 두 번째 밤',stayNote:'체크인 15:00부터',tipTitle:'로프웨이를 타도 조금 걸어요',tip:'산 정상 정류장에서 천수각까지 약 10분 더 걸어요. 내부 계단이 부담스러우면 성곽과 전망 위주로 봐요. 12월 천수각 입장 마감은 16:00예요.',stops:[
  {id:'d2-breakfast',routePlace:'道後舘 松山市道後多幸町7-26',info:['08:00','아침','조식·마지막 온천','숙소에서 아침을 먹고 출발 준비를 해요.','','조식 포함 여부는 예약 확인','meal']},
  {id:'d2-luggage',info:['10:00','이동','칸데오 호텔에 짐 맡기기','도고칸 체크아웃 후 시내 숙소로 이동해요. 캐리어가 있으면 택시가 편해요.','カンデオホテルズ松山大街道','전차 이용 시 도고온천역 → 오카이도, 약 12분 + 도보']},
  {id:'d2-castle',info:['10:45','관광','마쓰야마성','로프웨이로 올라가 성곽과 시내 전망을 둘러봐요. 약 2시간을 잡아요.','松山城ロープウェイ 東雲口駅','지도는 로프웨이 아래쪽 승강장으로 연결돼요.']},
  {id:'d2-kadoya',info:['13:00','점심','카도야 로프웨이거리점','도미회와 날달걀 양념을 곁들이는 우와지마 도미밥을 맛봐요.','かどや ロープウェー街店 松山市大街道3-7-4','날것을 안 드시면 익힌 메뉴로 골라요.','meal']},
  {id:'d2-bansuiso',info:['14:00','구경·간식','상점가 → 반스이소','10 FACTORY에서 귤 주스나 젤라토를 먹고, 숲 옆 서양식 저택을 구경해요.','萬翠荘 松山市','카페와 저택 관람은 컨디션에 맞게 조절해요.']},
  {id:'d2-hotel-rest',info:['15:30','휴식','호텔 체크인·쉬는 시간','저녁 전에 숙소에서 편하게 쉬고, 17:20에 아키요시 본점으로 출발해요.','カンデオホテルズ松山大街道','식당까지 도보 약 3~5분 예상 · 17:30 영업 시작에 맞춰 가요.']},
  {id:'d2-akiyoshi',info:['17:30','저녁','아키요시 본점','도미솥밥 정식과 도미 소면을 하나씩 골라 나눠 맛봐요. 각 2,600엔이며, 술 없이 식사를 즐겨요.','松山鯛めし 秋嘉 本店 松山市大街道3-5-1','예약 없이 방문 순서대로 입장 · 대기 가능 · 주문 마감 20:00 · 도미 소진 시 조기 마감','meal']}
 ]},
 {id:3,date:'12월 5일 토요일',title:'항구를 걷다가, 바다 앞 쉼표',description:'미쓰하마에서 점심을 먹고 바이신지로 가요. 바다와 카페를 함께 즐겨요.',image:'assets/baishinji-sea.webp',alt:'바이신지역 플랫폼 너머 해 질 무렵의 바다',route:['미쓰하마 점심','항구·나룻배','바이신지 바다','시내 초밥'],stay:'칸데오 호텔 · 세 번째 밤',stayNote:'숙소 이동 없이 편하게 쉬어요',tipTitle:'바다 코스는 날씨 좋은 날에',tip:'사진은 바이신지의 노을 풍경이에요. 기본 일정은 오후 방문이에요. 바람이나 비가 심하면 바닷가 대신 시내 카페·쇼핑으로 바꿔요. 나룻배는 악천후에 멈출 수 있어요.',stops:[
  {id:'d3-breakfast',routePlace:'カンデオホテルズ松山大街道',info:['08:30','아침','호텔 조식','점심이 든든한 메뉴라 아침은 가볍게 먹어요.','','조식은 예약 포함 여부 확인','meal']},
  {id:'d3-mitsu-station',info:['10:00','이동','미쓰역으로 출발','오카이도에서 마쓰야마시역으로 이동한 뒤, 다카하마선 전철을 타요.','三津駅 伊予鉄道 松山市','JR 마쓰야마역과 이요테쓰 마쓰야마시역을 구분해요.']},
  {id:'d3-hinode',info:['11:00','점심','히노데','면과 여러 재료를 겹쳐 구운 미쓰하마야키를 먹어요.','お好み焼 日の出 松山市三杉町11-8','개점 시간에 맞춰 방문 · 수요일 정기 휴무','meal']},
  {id:'d3-port-ferry',info:['12:00','산책','미쓰하마 항구·미쓰노와타시','항구 골목을 구경하고 짧은 무료 나룻배를 타고 건너가요.','三津の渡し 三津側乗り場','나룻배 07:00~19:00 수시 운항 · 악천후 중단 가능']},
  {id:'d3-baishinji-station',info:['13:30','이동','바이신지역','미나토야마역에서 전철로 이동해 바다를 만나요.','梅津寺駅 松山市','걷는 양을 줄이려면 역 사이를 전철로 이동해요.']},
  {id:'d3-beach-cafe',info:['14:00','바다·카페','바이신지 해변·미캰파크','바다를 바라보고, 카페에서 귤 디저트를 먹으며 쉬어요.','みきゃんパーク梅津寺','토요일 카페 주문 마감 16:30 · 영업 종료 17:00']},
  {id:'d3-hotel-rest',info:['15:30','휴식·쇼핑','시내 복귀·휴식·기념품','숙소에서 쉬고, 여유가 있으면 오카이도 주변에서 필요한 기념품을 골라요.','カンデオホテルズ松山大街道','마지막 날은 공항으로 바로 가니 쇼핑은 오늘까지 마무리해요.']},
  {id:'d3-sushimaru',info:['18:00','저녁','스시마루 본점','니기리즈시나 마쓰야마즈시로 마지막 저녁을 즐겨요.','すし丸 本店 松山市二番町2-3-2','토요일 저녁 예약 추천 · 예약 전','meal']},
  {id:'d3-packing',info:['20:00','귀국 준비','짐 정리·내일 아침 택시 부탁하기','프런트에 내일 07:00 공항행 택시 배차를 부탁하고, 아침에는 바로 나갈 수 있게 짐을 정리해요.','カンデオホテルズ松山大街道','택시는 아직 예약 전이에요. 조식 이용과 이른 체크아웃도 함께 확인해요.']}
 ]},
 {id:4,date:'12월 6일 일요일',title:'아침 먹고, 택시로 공항에 가요',description:'호텔에서 조식을 먹고 체크아웃한 뒤 공항으로 바로 이동해요. 09:35 비행기라 07:30 공항 도착을 목표로 해요.',flight:'제주항공 7C1722 · 마쓰야마 09:35 → 인천 T1 11:20',image:null,route:['06:30 호텔 조식','07:00 택시 출발','07:30 공항 도착','09:35 비행기'],stay:'오늘은 집으로 돌아가는 날',stayNote:'07:00 택시 출발 · 전날 배차 요청',tipTitle:'조식 후 공항으로 바로',tip:'칸데오 조식은 06:30부터예요. 짐은 전날 정리하고, 06:55까지 식사를 마쳐 07:00 택시를 타요. 호텔에서 공항까지 약 30분을 예상해요.',stops:[
  {id:'d4-breakfast',routePlace:'カンデオホテルズ松山大街道',info:['06:30','아침','칸데오 호텔 조식','조식이 시작할 때 내려가 아침을 먹어요. 06:55까지 식사를 마치고 바로 출발 준비를 해요.','','호텔 공식 조식 시간 06:30~09:30 · 조식 이용은 전날 확인해요.','meal']},
  {id:'d4-checkout',info:['07:00','택시 출발','체크아웃 후 택시 타기','06:55 전후 체크아웃을 마치고, 짐을 모두 챙겨 공항행 택시에 타요.','カンデオホテルズ松山大街道','전날 프런트에 07:00 배차를 부탁해요. 공항까지 약 30분을 예상해요.']},
  {id:'d4-airport',travelMode:'driving',info:['07:30','도착 목표','마쓰야마공항 국제선 수속','09:35 출발까지 약 2시간 여유를 두고 도착해요. 제주항공 체크인·수하물 위탁 후 보안검색과 출국 심사를 해요.','松山空港','교통 상황에 따라 도착 시각이 달라질 수 있어요. 탑승구는 당일 전광판에서 확인해요.']},
  {id:'d4-flight',fixedTime:true,info:['09:35','귀국 항공편','제주항공 7C1722 출발','마쓰야마에서 출발해 11:20 인천공항 제1터미널에 도착하는 일정이에요.','松山空港','탑승 시작·마감 시간은 항공권과 당일 안내를 확인해요.']}
 ]}
];
const foods = [
 ['선택 · 도고 점심','아키요시 도고점','秋嘉 道後店','도미와 밥을 함께 익히는 솥밥집. 도고에서 점심을 먹는 일정으로 바꿀 때의 후보예요. 첫날은 도착이 늦어 점심 방문이 어려워요.','마쓰야마식 도미솥밥','점심 주문 마감 14:30 · 예약 불가','松山鯛めし 秋嘉 道後店 松山市道後湯之町12-34'],
 ['4일 점심','카도야 로프웨이거리점','かどや ロープウェー街店','성 구경을 마치고 들르기 좋은 식당. 도미회와 달걀 양념을 곁들이는 우와지마 도미밥을 맛봐요.','우와지마식 도미밥','도미회·날달걀 사용 · 기호에 맞게 선택','かどや ロープウェー街店 松山市大街道3-7-4'],
 ['4일 저녁 · 17:30','아키요시 본점','松山鯛めし 秋嘉 本店','호텔에서 걸어가기 좋은 도미요리 전문점. 도미솥밥 정식과 도미 소면을 하나씩 골라 나눠 맛봐요. 도고점과 다른 시내 본점이에요.','도미솥밥 정식 · 도미 소면 각 2,600엔','17:30~20:30 · 주문 마감 20:00 · 예약 없이 선착순 · 소진 시 조기 마감','松山鯛めし 秋嘉 本店 松山市大街道3-5-1'],
 ['5일 점심','히노데','日の出','면과 양배추, 고기 등을 겹쳐 굽는 항구마을의 든든한 한 끼예요.','미쓰하마야키','11:00 개점 · 수요일 휴무','お好み焼 日の出 松山市三杉町11-8'],
 ['5일 저녁','스시마루 본점','すし丸 本店','지역 초밥이나 니기리즈시를 먹으며 마지막 저녁을 여유 있게 보내요.','마쓰야마즈시 · 니기리즈시','토요일 저녁 예약 추천','すし丸 本店 松山市二番町2-3-2'],
 ['선택 · 시내 점심','고토리','ことり','따뜻한 나베야키우동을 먹고 싶을 때 시내 관광일의 점심 대신 고를 수 있어요. 마지막 날에는 방문하지 않아요.','나베야키우동 · 이나리즈시','10:00~14:00 · 소진 시 종료 · 수요일 휴무','鍋焼きうどん ことり 松山市湊町3-7-2']
];
const sources = [
 ['도고온천 공식 안내','https://dogo.jp/'],['마쓰야마성 관람 안내','https://www.matsuyamajo.jp/en/guide.html'],['반스이소','https://www.bansuisou.org/'],['도고칸','https://www.dogokan.co.jp/ko/'],['칸데오 호텔·공항 이동','https://www.candeohotels.com/ja/ehime-matsuyama/access/'],['칸데오 조식 시간','https://www.candeohotels.com/ja/ehime-matsuyama/breakfast/'],['마쓰야마공항 교통 안내','https://www.matsuyama-airport.co.jp/access/'],
 ['아키요시 도고점','https://w-harmony.jp/shop/akiyoshi-dogo/'],['카도야 매장 안내','https://www.kadoya-taimeshi.com/kadoyamanage/shoplist/'],['아키요시 본점','https://w-harmony.jp/shop/akiyoshi/'],['아키요시 본점 메뉴','https://tabelog.com/ehime/A3801/A380101/38011850/dtlmenu/'],['히노데·미쓰하마야키','https://www.mitsuhamaru.com/mitsuhamayaki/shop/'],['스시마루','https://www.sushimaru.co.jp/'],['고토리 관광 안내','https://matsuyama-sightseeing.com/topics/trip_family02/'],
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
 panel.innerHTML = `<div class="day-intro ${day.image ? '' : 'no-image'}"><div class="day-intro-copy"><p class="day-count">DAY 0${day.id} · ${day.date}</p><h3>${day.title}</h3><p class="description">${day.description}</p>${day.flight?`<p class="flight-note">✈ ${day.flight}</p>`:''}<div class="route-line" aria-label="이동 순서">${day.route.map((r,i)=>`${i?'<i aria-hidden="true">→</i>':''}<span>${r}</span>`).join('')}</div></div>${day.image?`<img src="${day.image}" alt="${day.alt}" width="520" height="360">`:''}</div>
 <p class="timeline-help"><span aria-hidden="true">↓</span> 시간 사이의 선이나 화살표를 누르면<br class="mobile-break"> 다음 장소까지 구글맵 길찾기가 열려요.</p>
 <div class="day-layout"><ol class="timeline">${day.stops.map(({id:stopId,info:s},index)=>`<li class="stop ${s[6]||''}">${routeLink(day.stops[index], day.stops[index+1])}<div class="stop-time">${s[0]}<small>${day.stops[index].fixedTime?'항공편':'예상'}</small></div><div><span class="stop-category">${s[1]}</span><h4>${s[2]}</h4><p>${s[3]}</p>${s[5]?`<p class="small-note">${s[5]}</p>`:''}${s[4]?`<a class="map-button" href="${mapUrl(s[4])}" target="_blank" rel="noopener" aria-label="${s[2]} 구글지도 보기, 새 창">${icon('pin')}지도 보기</a>`:''}<details class="stop-memo"><summary class="memo-toggle"><span class="memo-arrow" aria-hidden="true">▶</span>엄마의 의견!</summary><div class="memo-content"><label class="visually-hidden" for="memo-${stopId}">${day.date} ${s[0]} ${s[2]} 엄마의 의견</label><textarea id="memo-${stopId}" data-note-id="${stopId}" rows="3" placeholder="먹고 싶은 메뉴나 기억할 일을 적어 주세요." aria-describedby="memo-storage-info memo-status-${stopId}"></textarea><p id="memo-status-${stopId}" class="memo-status" role="status" aria-live="polite"></p></div></details></div></li>`).join('')}</ol></div>`;
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
