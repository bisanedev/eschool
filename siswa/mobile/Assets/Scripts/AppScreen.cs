using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class AppScreen : MonoBehaviour
{
    public Button LogoutButton;   
    void Start()
    {
        LogoutButton.onClick.AddListener(Logout); 
    }

    // Update is called once per frame
    void Logout()
    {
      PlayerPrefs.DeleteKey("userToken");
      SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);
    }
}
