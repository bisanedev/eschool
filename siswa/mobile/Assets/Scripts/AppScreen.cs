using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class AppScreen : MonoBehaviour
{
    public Button LogoutButton;  
    public Button TestButton;
    public Text DebugText; 
    public Text TestText;
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
        LogoutButton.onClick.AddListener(Logout);        
        TestButton.onClick.AddListener(testRespon);        
        DebugText.text = PlayerPrefs.GetString("userData");                
    }

    void testRespon()
    {      
      StartCoroutine(ApiManager.GetData("/api/siswa/test", (UnityWebRequest req) => {
        if (req.result == UnityWebRequest.Result.Success) {
         if(req.responseCode == 200){            
            TestText.text = req.downloadHandler.text;
         }
        }else{
         if(req.responseCode == 401){
            Logout();
         }
        }       
      }));  
    }
 
    void Logout()
    {
      PlayerPrefs.DeleteAll();
      SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);
    }
}
