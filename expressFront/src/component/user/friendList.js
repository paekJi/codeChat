import axios from "axios";
import React, {useEffect, useState}  from "react";
import { AppConfig } from "../../config/config";


const FriendList = ()=>{
    const [friendList , setFriendList] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    console.log(Array.isArray(friendList));

    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        const getFriendList = async () =>{
            const response =  await axios.get(AppConfig.serverAddress + "/api/friend/friendList");
            if(response.data && response.data.friendList){
                console.log("없으면 넣지말라고", response.data.friendList);
                setFriendList(response.data.friendList);
            }
        }
        getFriendList();

    },[])


    const openModal = () => {


    }

    /**change userid searchword */
    const searchWordChange = (e)=>{
        setSearchWord(e.target.value);
    }

    /**search keyword */
    const getSearchResult = async ()=>{
        try {
            const response = await axios.get(AppConfig.serverAddress + "/api/friend/searchUser",
                {params : {searchWord : searchWord}});
    
            if(response.data){
                setSearchResult(response.data.searchResult);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const requestFriend = async (e) => {
        const userKey = e.target.dataset.id;
        const response = await axios.post(AppConfig.serverAddress + "/api/friend/requestFriend",{userKey : userKey},{})
        
    }


    return (
        <div className="app-content">
            <h3>친구 목록</h3>
            {friendList.length > 0 ? (
                friendList.map((friend, idx) => (
                    <div key={idx}>{idx} : {friend.userName}</div>
                ))
                ) : (
                <p>No friends found.</p>
            )}
            <input type="button" onClick={openModal} value="친구 검색하기"/>
    

            <h3>친구 요청 목록 </h3>
            


        {/**나중에.. */}
            <div>
                <p>아이디를 통해서 검색합니다.</p>
               <input type="text" placeho8lder="" onChange={searchWordChange} />
               <input type="button" value="검색" onClick={getSearchResult}/>

               <div name="searchResult">    
                {searchResult.length > 0 ? (
                    searchResult.map((result, idx) => (
                        <div key={"div"+idx}>{idx} : 아이디 ::  {result.userId}  유저명 ::  {result.userName} 
                            <input key={"input" + idx}  type="button" data-id = {result._id}
                                 value={friendList.find(friend => friend._id === result._id) ? "이미 친구" : "요청"} 
                                 onClick={requestFriend}/>
                        </div>
                    )))
                     : (<p>검색결과가 없습니다.</p>
                )}
                </div> 
            </div>
        
        </div>

        
           
    );

}


const FriendSearchModal = ()=>{
    return (
            <div>
               <input type="text" placeho8lder="" />
               <input type="button" value="검색"/>

               <div name="searchResult">
                </div> 
            </div>
    )
}


export default FriendList;