using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class GlobalVariable : MonoBehaviour
{
    
    public static string ServerName;
    public static string SekolahName;
    void Start()
    {
        ServerName = "http://192.168.7.250";
        SekolahName = "Nama Sekolah";
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
