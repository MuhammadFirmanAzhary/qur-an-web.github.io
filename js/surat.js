function getURL(e){
    const pageURL= window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e ){
            return parameterName[1];
        }
    }
}
const nomorsurat = getURL('nomorsurat');

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response =>{ 
        
        //title surat

        const titleSurat= document.querySelector('#title-surat');
        titleSurat.textContent = ` Surat
         ${response.nama_latin}
        `;
        //judul surat
        const judulSurat = document.querySelector('.judul-surat');
        const cardJudulSurat =`
        <strong>${response.nama_latin} - ${response.nama}</strong>
        <p>Jumalah ayat: ${response.jumlah_ayat} (${response.arti})</p>
        <button class="btn btn-primary audio-button-play">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
                <path
                    d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z" />
            </svg>
            Dengarkan
        </button>
        <button class="btn btn-danger audio-button-pause hidden-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
        </svg>
        stop
    </button>
        <audio id ="audio-tag" src="${response.audio}"></audio>
        `;
        judulSurat.innerHTML= cardJudulSurat;
        //end judul surat


        //isi surat
        const surat = response.ayat;
        let isiSurat = '';
        surat.forEach(s => {
            isiSurat+= `
            <div class="card mb-3  ">
                <div class="card-body">
                    <p>${s.nomor}</p>
                    <h3 class="text-end">${s.ar}</h3>
                    <p >${s.tr}</p >
                <p>${s.idn}</p>
            </div>
          </div>
            `;
        });

        const cardIsiSurat = document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML=isiSurat

    //  console.log(surat)
        //play and pause audio
  const buttonPlay =document.querySelector('.audio-button-play');
  const buttonPause =document.querySelector('.audio-button-pause');
  const audioSurat = document.querySelector('#audio-tag');

  //play
  buttonPlay.addEventListener('click', function(){
    buttonPlay.classList.add('hidden-button');
    buttonPause.classList.remove('hidden-button');
    audioSurat.play();
  })
    //pause
    buttonPause.addEventListener('click', function(){
        buttonPause.classList.add('hidden-button');
        buttonPlay.classList.remove('hidden-button');
        audioSurat.pause();
      })
 


    });
}       
getSurat();