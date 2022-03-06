let apikey = "AIzaSyC6BSe354hRHQGZPf-lUO2xRZ-hsrmkVx4";
let videos = "https://www.googleapis.com/youtube/v3/videos?";
let channels = "https://www.googleapis.com/youtube/v3/channels?";
let upload = "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId={UPLOADS_PLAYLIST_ID}"
let subscription = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true"
const videos_maker = document.querySelector('.videosnippet');

fetch(videos + new URLSearchParams({
    key: apikey,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 100,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channels + new URLSearchParams({
        key: apikey,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        make_Card(video_data);
    })
}

const make_Card = (data) => {
    videos_maker.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="thumbnail">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="channelicon">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})


function toggleShow() {
    document.getElementsByClassName("toggle-list").classList.toggle("show");
  }