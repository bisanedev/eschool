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
    private string userToken; 
    void Start()
    {
        Screen.autorotateToPortrait = true;        
        Screen.autorotateToPortraitUpsideDown = true;
        Screen.autorotateToLandscapeLeft = false;
        Screen.autorotateToLandscapeRight = false;        
        Screen.orientation = ScreenOrientation.AutoRotation;
        LogoutButton.onClick.AddListener(Logout);        
        TestButton.onClick.AddListener(testRespon);
        userToken = PlayerPrefs.GetString("userToken");
        DebugText.text = PlayerPrefs.GetString("userData");                
    }

    void testRespon()
    {
      StartCoroutine(getData("http://192.168.7.250/api/siswa/test"));
    }

    IEnumerator getData(string uri)
    {
      

      using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
                        
            webRequest.SetRequestHeader("Authorization","Bearer " +userToken );
            // Request and wait for the desired page.
            yield return webRequest.SendWebRequest();         

            Debug.Log(webRequest.downloadHandler.text);
            Debug.Log(webRequest.result);
            
            switch (webRequest.result)
            {
                case UnityWebRequest.Result.ConnectionError:
                case UnityWebRequest.Result.DataProcessingError:
                    Debug.LogError("Error: " + webRequest.error);                   
                    break;
                case UnityWebRequest.Result.ProtocolError:
                    Debug.LogError("HTTP Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.Success:
                    Debug.Log("Received: " + webRequest.downloadHandler.text);
                    TestText.text = webRequest.downloadHandler.text;
                    break;
            }
        }
    }
    void Logout()
    {
      PlayerPrefs.DeleteAll();
      SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);
    }
}
