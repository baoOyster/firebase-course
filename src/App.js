import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db,auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [isOscar, seIsOscar] = useState(false);

  // Update Title State
  const [ updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null); 

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      // Read the data
      // Set the movie list
      try{
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}));
        console.log(filteredData);
        setMovieList(filteredData);
      }catch(e){
        console.error(e);
      }
    };

    getMovieList();
  }, [movieList])
  
  const onSubmitMovie = async () => {
      try {
        await addDoc(moviesCollectionRef, {title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isOscar,
        userId: auth?.currentUser?.uid
      });
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}));
        console.log(filteredData);
        setMovieList(filteredData);

      } catch (error) {
        console.error(error); 
      }
  }
  
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.error(error);
    }
  }

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle});
    } catch (error) {
      console.error(error);
    }
  }

  const uploadFile = async () => {
    if(!fileUpload)return;
    console.log(fileUpload.name);
    const filesFolderRef = ref(storage, `test/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="App">
      <Auth/>

      <div>
        <input placeholder='Movie title...' type='text' onChange={({target}) => setNewMovieTitle(target.value)}/>
        <input placeholder='releaseDate...' type='number' onChange={({target}) => setNewReleaseDate(target.value)}/>
        <input type='checkbox' checked={isOscar} onChange={({target}) => seIsOscar(target.checked)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map(movie => {
          return(
          <div>
            <h1 style={{color: movie.receivedAnOscar ? 'yellow' : 'black'}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='title...' onChange={({target}) => setUpdatedTitle(target.value)}/>
            <button onClick={() => updateMovieTitle(movie.id)}>Change title</button>
          </div>)
        })}
      </div>

      <div>
        <input type="file" onChange={({target}) =>setFileUpload(target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
