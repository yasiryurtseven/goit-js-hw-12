import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{S as f,i as r,a as y}from"./assets/vendor-DGT8nefX.js";const d=document.querySelector(".search-form"),n=document.querySelector(".gallery"),m=document.querySelector(".loader"),o=document.querySelector(".loader-btn"),p=document.querySelector(".loader-more"),i=new f(".gallery a",{captions:!0,captionsData:"alt"});let a=1,c=40,g="";const h=async function(t,e){try{return(await y.get("https://pixabay.com/api/",{params:{key:"54641867-0b2bd143cc574463d0ab3cc86",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:c}})).data}catch(l){r.info({title:"Info",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(l)}};function u(s){const t=s.map(e=>`<div class="photo-card">
      <a href= "${e.largeImageURL}">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${e.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${e.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${e.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${e.downloads}
        </p>
      </div>
    </div>`).join("");return i.refresh(),t}d.addEventListener("submit",async s=>{s.preventDefault();const t=d.elements.search.value.trim();if(a=1,g=t,n.innerHTML="",t===""){r.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}m.classList.remove("hidden");const e=await h(t,a);if(m.classList.add("hidden"),e.hits.length===0){r.error({title:"Error",message:"No images found. Please try a different search query.",position:"topRight"});return}n.innerHTML=u(e.hits),i.refresh(),e.totalHits>c&&o.classList.remove("hidden-2")});o.addEventListener("click",async()=>{a+=1,o.classList.add("hidden-2"),p.classList.remove("hidden");const s=await h(g,a);p.classList.add("hidden"),n.insertAdjacentHTML("beforeend",u(s.hits)),i.refresh();const t=document.querySelector(".photo-card");if(t){const e=t.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}if(o.classList.remove("hidden-2"),a*c>=s.totalHits){r.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"topRight"});return}});
//# sourceMappingURL=page-2.js.map
