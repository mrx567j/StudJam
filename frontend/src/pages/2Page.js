import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./2Page.css";

function Servers() {

  const navigate = useNavigate();

  const servers = [
    {
      id: 1,
      name: "General Discussion",
      description: "Talk about anything — school, life, memes and more.",
      members: "2.4k",
      icon: "🎓"
    },
    {
      id: 2,
      name: "Study & Academics",
      description: "Share notes, ask doubts and study together.",
      members: "1.8k",
      icon: "📚"
    },
    {
      id: 3,
      name: "Tech & Programming",
      description: "Discuss coding, projects and technology.",
      members: "1.2k",
      icon: "</>"
    },
    {
      id: 4,
      name: "UPSC & Competitive Exams",
      description: "Preparation, resources and current affairs.",
      members: "3.1k",
      icon: "🏛"
    },
    {
      id: 5,
      name: "College Life",
      description: "Hostel, campus life, placements and events.",
      members: "950",
      icon: "👥"
    }
  ];

  const [isOpen , setOpen] = useState(false);
  const [Name , setName] = useState("");
  const [Desc , setDesc] = useState("");
  const [serverL , setServerL] = useState([]);
  const [currUser , setCurr] = useState(null);

  const [search,setSearch] = useState("");
  const[filteresServ , setFilt] = useState([]);

  const [tag2 , setTag2] =useState(false);

const joinedSearchResults = serverL
  .filter((server) =>
    server.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((server) => ({
    ...server,
    isMember: true
  }));

const notJoinedSearchResults = filteresServ.map((server) => ({
  ...server,
  isMember: false
}));

const finalResults = [
  ...joinedSearchResults,
  ...notJoinedSearchResults
];





  const close = ()=>{
    setOpen(false);
  }


   useEffect(()=>{
      
        const getCurrUser = async()=>{
          console.log("call me")
          try{
          const l = await fetch("http://localhost:5713/me",{
            credentials:"include"
          });
  
          
  
        const data = await l.json();
        localStorage.setItem("jis" , data.avatar);
        localStorage.setItem("jis2" , data.id);
        localStorage.setItem("jis3" , data.branch);
        localStorage.setItem("jis4" , data.section);
        localStorage.setItem("jis5" , data.username);
  
        if(l.ok){
          console.log(data);
          setCurr(data);
  
        
        }else{
          
          console.log(data.message)
        }
      }catch(error){
        console.log(error);
      }
  
  
  
        }
  
       getCurrUser();
  
     },[])


  useEffect(()=>{
     const getServe = async()=>{
      try{
           const response = await fetch('http://localhost:5713/serverList',{
             credentials:"include"
           });

           const res = await response.json();

           if(response.ok){
            setServerL(res.findi);
            console.log('sussex')
           }else{
            console.log(res.message)
           }




      }catch(error){
            console.log(error);
      }
     }  

     getServe();


  } , [])

  const createServer = async(e)=>{
    e.preventDefault();
      const data = {Name,Desc};

      try{
         const response = await fetch('http://localhost:5713/createServer',{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(data),
         })

         const res = await response.json();

         if(response.ok){
          console.log(res.message)
          alert('server created')
         }
         else{
           console.log(res.message)
         }

      }catch(error){
        console.log(error);
      }
  }

  useEffect(()=>{
     const searchServer = async()=>{
        const data = {search};
        if(search.trim() === ""){
          return;
        }

        try{  
          const response = await fetch("http://localhost:5713/searchServer",{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(data),
          });

          const res = await response.json();
          
          if(response.ok){
            console.log("data got")
             setFilt(res.findi);
          }else{
               console.log(res.message)
          }
           

        }catch(error){
             console.log(error)
        }
     }

     searchServer()
  },[search])











  return (
    <div className="servers-page">

      {/* Header */}
      <header>
        <h2>🎓 StudentForum</h2>

        <div className="profile" onClick={()=>{navigate(`/Profile/${currUser.id}`)}}>
          {currUser?.avatar|| '👤'}
        </div>
      </header>


      {/* Main */}
      <main>
<div className="title-row">
        <div className="title">
          <h1>Servers</h1>
          <p>
            Join communities and connect with other students.
          </p>
        </div>
    <div className="search-wrapper">
          <div className="server-search">
    <span className="search-icon">⌕</span>

    <input
      type="text"
      placeholder="Search servers..."
      value={search}
      onChange={(e)=>{setSearch(e.target.value)
         setTag2(true)
      }}
    />

    <button type="button">
      🔍
    </button>
  </div>

    {tag2 && (
    <div
      className="search-results-overlay"
      onClick={() => setTag2(false)}
    >
      <div
        className="search-results-box"
        
      >
        <h2>Search results</h2>

        {finalResults.map((server) => (
          <div className="server" key={server._id}>
            <div className="server-info">
              <h3>{server.name}</h3>
              <p>{server.description}</p>
            </div>

            {!server.isMember && (
              <button className="server-arrow">
                Join
              </button>
            )}

            <button
              className="server-arrow"
              onClick={() => navigate(`/PubChat/${server.name}`)}
            >
              →
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
  </div>

        </div>



        {/* Add Server */}
        <button className="add-server">
          Your servers
        </button>


        {/* Server Cards */}
        <div className="server-list">

          {serverL.map((server) => (

            <div className="server" key={server._id}>

              {/* <div className="server-icon">
                {server.icon}
              </div> */}

              <div className="server-info">

                <h3>{server.name}</h3>

                <p>
                  {server.description}
                </p>

                {/* <small>
                  {server.members} members
                </small> */}

              </div>

              <button className="server-arrow" onClick={()=>{navigate(`/PubChat/${server.name}`)}}>
                →
              </button>

            </div>

          ))}

    

        </div>
 {
isOpen && (
<div className="overlay" onClick={close}>

  <div
    className="signup-card"
    onClick={(e) => e.stopPropagation()}
  >

    {/* Tabs */}

  

    {/* Avatar Section */}

    <h3 className="avatar-title">
      PICK YOUR AVATAR
    </h3>
      <div className="avatar-grid">
{/* 
      <button className="avatar" onClick={()=>{setAvatar('🎓')}}>🎓</button>
      <button className="avatar" onClick={()=>{setAvatar('🤓')}}>🤓</button>
      <button className="avatar" onClick={()=>{setAvatar('😎')}}>😎</button>
      <button className="avatar" onClick={()=>{setAvatar('🦊')}}>🦊</button>
      <button className="avatar" onClick={()=>{setAvatar('🐼')}}>🐼</button>
      <button className="avatar" onClick={()=>{setAvatar('🐸')}}>🐸</button>
      <button className="avatar" onClick={()=>{setAvatar('🦄')}}>🦄</button>

      <button className="avatar" onClick={()=>{setAvatar('🐙')}}>🐙</button>
      <button className="avatar" onClick={()=>{setAvatar('🎮')}}>🎮</button>
      <button className="avatar" onClick={()=>{setAvatar('🎸')}}>🎸</button>
      <button className="avatar" onClick={()=>{setAvatar('🌟')}}>🌟</button>
      <button className="avatar" onClick={()=>{setAvatar('🔥')}}>🔥</button> */}

    </div>

    

    {/* Form */}

    <form className="server-form" autoComplete="off">
    

      <input
        
        name='Name'
        placeholder="Name of the server"
        value={Name}
        onChange={(e)=>{setName(e.target.value)}}  
      />

      <input
        name="Desc"
        placeholder="Description"
        value={Desc}
        onChange={(e)=>{setDesc(e.target.value)}}
      />

      

     

      <button
        type="submit"
        className="server-btn"
        onClick={createServer}
      >
        Create Server
      </button>

    </form>

  

  </div>

</div>)}

        {/* Add Server Box */}
        <div className="add-box">

          <h2>+</h2>

          <h3>Add Server</h3>

          <p>
            Create your own student community.
          </p>

          <button onClick={()=>{setOpen(true)}}>
            + Create Server
          </button>

          <span>OR</span>

          <button className="invite">
            🔗 Join with Invite Link
          </button>

        </div>

      </main>

    </div>
  );
}

export default Servers;