                            //dbname,dbversion
let request = indexedDB.open('Camera', 1);
let db;

request.onsuccess=function(e)
{
    db = request.result;
}
request.onerror=function(e)
{
    console.log('error');
}
request.onupgradeneeded =function(e)
{
    db = request.result;
                         // objectstore,key
    db.createObjectStore('gallery',{keyPath:'mId'});

}
                        // media, video/photo
function addMediaToGallery(data,type)
{
                           // objectstore,typeofTx
    let tx = db.transaction('gallery','readwrite');
    let gallery = tx.objectStore('gallery');
                  // current date,type(vdo/photo),data
    gallery.add({mId:Date.now(),type,media:data});
}
function viewMedia()
{
    let body = document.querySelector('body');
    let tx = db.transaction('gallery','readonly');
    let gallery = tx.objectStore('gallery');
    let req = gallery.openCursor();
    req.onsuccess=function()
    {
        let cursor = req.result;
        if(cursor)
        {
            if(cursor.value.type=='video')
            {
                let vidContainer = document.createElement('div');
                vidContainer.setAttribute('data-mId',cursor.value.mId);
                vidContainer.classList.add('gallery-vid-container');

                let video = document.createElement('video');
                video.controls=true; // autoplay to contol bhi true 
                video.autoplay= true;
                video.src = URL.createObjectURL(cursor.value.media);
                vidContainer.appendChild(video);

                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('gallery-delete-button');
                deleteBtn.innerText='Delete';
                deleteBtn.addEventListener('click', deleteBtnHandler);
                vidContainer.appendChild(deleteBtn);
                
                let downloadBtn = document.createElement('button');
                downloadBtn.classList.add('gallery-download-button');
                downloadBtn.innerText='Download';
                downloadBtn.addEventListener('click',downloadBtnHandler);
                vidContainer.appendChild(downloadBtn);
                
                body.appendChild(vidContainer);
            }
            else{
                let imgContainer = document.createElement('div');
                imgContainer.setAttribute('data-mId',cursor.value.mId);
                imgContainer.classList.add('gallery-img-container');

                let img = document.createElement('img');
                img.src = cursor.value.media;
                imgContainer.appendChild(img);

                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('gallery-delete-button');
                deleteBtn.innerText='Delete';
                deleteBtn.addEventListener('click', deleteBtnHandler);
                imgContainer.appendChild(deleteBtn);
                
                let downloadBtn = document.createElement('button');
                downloadBtn.classList.add('gallery-download-button');
                downloadBtn.innerText='Download';
                downloadBtn.addEventListener('click', downloadBtnHandler);
                imgContainer.appendChild(downloadBtn);
                
                body.appendChild(imgContainer);

            }
            cursor.continue();
        }
    }
    
}
function deleteMediaFromGallery(mId)
{
    let tx = db.transaction('gallery','readwrite');
    let gallery = tx.objectStore('gallery');
    gallery.delete(Number(mId));
}
function deleteBtnHandler(e)
{
    let mId = e.currentTarget.parentNode.getAttribute('data-mId');
    deleteMediaFromGallery(mId);
    e.currentTarget.parentNode.remove();
}
function downloadBtnHandler(e)
{
    let a = document.createElement('a');
    a.href = e.currentTarget.parentNode.children[0].src;
    if(e.currentTarget.parentNode.children[0].nodeName=='IMG')
    {
        a.download = 'image.png';
    }
    else
    {
        a.download = 'video.mp4';
    }
    a.click();
    a.remove();
}