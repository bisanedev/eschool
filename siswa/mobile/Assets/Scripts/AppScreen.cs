using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class AppScreen : MonoBehaviour
{     
    public ApiNetworkManager ApiManager;  

    void Start()
    {
        //autorotationPortrait
        Screen.autorotateToPortrait = true;        
        Screen.autorotateToPortraitUpsideDown = true;
        Screen.autorotateToLandscapeLeft = false;
        Screen.autorotateToLandscapeRight = false;        
        Screen.orientation = ScreenOrientation.AutoRotation;
        //jika tidak ada userToken maka login
        if (!PlayerPrefs.HasKey("userToken")){ SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);}
        // intialisasi tombols                             
    }

 
    void Logout()
    {
      PlayerPrefs.DeleteAll();
      SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);
    }
}
