using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
public class ApiNetworkManager : MonoBehaviour
{
    
    private static string ServerName = "http://192.168.7.250";     
    private string userToken;  
     
    void Start()
    {
        userToken = PlayerPrefs.GetString("userToken");
    }     

    public IEnumerator PostLogin(WWWForm formData, System.Action<UnityWebRequest> callback){
        using (UnityWebRequest webRequest = UnityWebRequest.Post(ServerName+"/api/siswa/auth",formData))
        {
            // Send the request and wait for a response
            yield return webRequest.SendWebRequest();                                  
            callback(webRequest);            
        }                           
    }

    public IEnumerator GetData(string uri, System.Action<UnityWebRequest> callback){
        using (UnityWebRequest webRequest = UnityWebRequest.Get(ServerName+uri))
        {
                        
            webRequest.SetRequestHeader("Authorization","Bearer " +userToken );
            // Request and wait for the desired page.
            yield return webRequest.SendWebRequest();         
            callback(webRequest);             
        }

    }
}


