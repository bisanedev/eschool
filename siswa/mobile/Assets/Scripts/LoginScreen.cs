using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;

public class LoginScreen : MonoBehaviour
{
    public InputField Username;
    public InputField Password;
    public Button LoginButton;  
    public Text ErrorMessage;         
    void Start()
    {
        Screen.autorotateToPortrait = true;
        Screen.autorotateToPortraitUpsideDown = true;
        Screen.autorotateToLandscapeLeft = false;
        Screen.autorotateToLandscapeRight = false;
        Screen.orientation = ScreenOrientation.AutoRotation;
        LoginButton.onClick.AddListener(Korotine);
    }

    void Korotine()
    {      
        StartCoroutine(LoginAction());
    }

    IEnumerator LoginAction() {
        WWWForm form = new WWWForm();
        form.AddField("username", Username.text);
        form.AddField("password", Password.text);

        UnityWebRequest www = UnityWebRequest.Post(GlobalVariable.ServerName+"/api/siswa/auth", form);
        yield return www.SendWebRequest();        
        if (www.result != UnityWebRequest.Result.Success) {
            //jika error
            responseDataError data = JsonUtility.FromJson<responseDataError>(www.downloadHandler.text); 
            ErrorMessage.text = data.message;
            Debug.Log(www.responseCode);
            Debug.Log(data.message);    
        }
        else {    
            // jika sukses 
            responseData data = JsonUtility.FromJson<responseData>(www.downloadHandler.text);                          
            string saveJson = JsonUtility.ToJson(data.message.user);
            PlayerPrefs.SetString("userToken", data.message.token);            
            PlayerPrefs.SetString("userData",saveJson);
            PlayerPrefs.Save();
            SceneManager.LoadScene("AppScreen", LoadSceneMode.Single);
        }
    }
}

[System.Serializable]
public class responseDataError
{
    public bool status;
    public string message;
}
[System.Serializable]
public class responseData
{
    public bool status;
    public Message message;
}
[System.Serializable]
public class Message
{
    public string token;
    public User user;    
}
[System.Serializable]
public class User
{
    public long id;
    public string username;
    public string jenis;
}
