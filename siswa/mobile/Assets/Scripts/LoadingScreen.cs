using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadingScreen : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Screen.autorotateToPortrait = true;
        Screen.autorotateToPortraitUpsideDown = true;
        Screen.orientation = ScreenOrientation.AutoRotation;        
        StartCoroutine(waiter());                   
    }

    IEnumerator waiter()
    {
       yield return new WaitForSecondsRealtime(2);
       if (PlayerPrefs.HasKey("userToken"))
        {   
            // jika ada next halaman utama            
            SceneManager.LoadScene("AppScreen", LoadSceneMode.Single);
        }else{
            // jika tidak ada ke halaman login
            SceneManager.LoadScene("LoginScreen", LoadSceneMode.Single);            
        }
    }

}
