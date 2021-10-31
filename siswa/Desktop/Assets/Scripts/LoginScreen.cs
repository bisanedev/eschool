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
    // Start is called before the first frame update
    void Start()
    {
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
        responseData data = JsonUtility.FromJson<responseData>(www.downloadHandler.text);

        if (www.result != UnityWebRequest.Result.Success) {
            //jika error
            Debug.Log(www.responseCode);
            Debug.Log(data.message);    
        }
        else {    
            // jika sukses 
            // Debug.Log(www.responseCode);              
            PlayerPrefs.SetString("userToken", data.message);            
            SceneManager.LoadScene("AppScreen", LoadSceneMode.Single);
        }
    }
}

[System.Serializable]
public class responseData
{
    public bool status;
    public string message;
}
