using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class LoginScreen : MonoBehaviour
{
    public InputField Username;
    public InputField Password;
    public Toggle RememberMe;
    public Button LoginButton;  
    public Text ErrorMessage;  
    public ApiNetworkManager ApiManager; 

    public InputField PasswordView;
    public Button ViewPassword;
    public Sprite eyeOn;
    public Sprite eyeOff; 

    void Start()
    {
        Screen.autorotateToPortrait = true;
        Screen.autorotateToPortraitUpsideDown = true;
        Screen.autorotateToLandscapeLeft = false;
        Screen.autorotateToLandscapeRight = false;
        Screen.orientation = ScreenOrientation.AutoRotation;
        LoginButton.onClick.AddListener(Login);
        ViewPassword.onClick.AddListener(ShowPassword);
    }

    void Login()
    {      
        WWWForm form = new WWWForm();
        form.AddField("username", Username.text);
        form.AddField("password", Password.text); 
        form.AddField("remember", RememberMe.isOn ? "Yes":"no");

        StartCoroutine(ApiManager.PostLogin(form, (UnityWebRequest req) => {
        if (req.result == UnityWebRequest.Result.Success) {
         if(req.responseCode == 200){
            responseData data = JsonUtility.FromJson<responseData>(req.downloadHandler.text);                          
            string saveJson = JsonUtility.ToJson(data.message.user);
            PlayerPrefs.SetString("userToken", data.message.token);            
            PlayerPrefs.SetString("userData",saveJson);
            PlayerPrefs.Save();
            SceneManager.LoadScene("AppScreen", LoadSceneMode.Single);
         }
        }else{
         if(req.responseCode == 401){
            responseDataError data = JsonUtility.FromJson<responseDataError>(req.downloadHandler.text); 
            ErrorMessage.text = data.message;   
         }
        }
        }));         
    }

     
 
    public void ShowPassword()
    {
        if (PasswordView.contentType == InputField.ContentType.Password)
        {
            ViewPassword.GetComponent<Image>().sprite = eyeOff;            
            PasswordView.contentType = InputField.ContentType.Standard;
        }
        else
        {
            ViewPassword.GetComponent<Image>().sprite = eyeOn;
            PasswordView.contentType = InputField.ContentType.Password;
        }
        PasswordView.ForceLabelUpdate();
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
