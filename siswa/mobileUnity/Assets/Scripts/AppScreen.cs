using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class AppScreen : MonoBehaviour
{     
    public ApiNetworkManager ApiManager;
    public Button LogoutTombol;  
    public Button GantiPasswordTombol;
    public Text NamaSiswa;
    public Text KelasNama;    
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
        GantiPasswordTombol.onClick.AddListener(gantiPassword);                           
        LogoutTombol.onClick.AddListener(Logout);
        User dataUser = JsonUtility.FromJson<User>(PlayerPrefs.GetString("userData")); 
        NamaSiswa.text = dataUser.username;
        KelasNama.text = dataUser.jenis;                
    }

    void gantiPassword()
    {
      Debug.Log("Ganti Tombol");
    }
    void Logout()
    {
      PlayerPrefs.DeleteAll();
      SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);
    }
}
