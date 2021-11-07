using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TabGroup : MonoBehaviour
{
    public List<TabButton> tabButtons;    
    public Color tabIdle;
    public Color tabHover;
    public Color tabActive;
    public TabButton selectedTab;
    public List<GameObject> objectsToSwap;
    public Text titleHeader;

    void Start()
    {    
        selectedTab.background.color = tabActive;
    }

    public void Subscribe(TabButton button)
    {
        if(tabButtons == null)
        {
            tabButtons = new List<TabButton>();
        }
        tabButtons.Add(button);
    }
  
    public void OnTabEnter(TabButton button)
    {
        ResetTabs();
        if(selectedTab == null || button != selectedTab)
        {
            button.background.color = tabHover;
        }        
    }

    public void OnTabExit(TabButton button)
    {
        ResetTabs();        
    }

    public void OnTabSelected(TabButton button)
    {        
        selectedTab = button;
        ResetTabs();
        button.background.color = tabActive;
        int index =  button.transform.GetSiblingIndex();
        for(int i=0; i<objectsToSwap.Count; i++)
        {
            if(i == index){
                objectsToSwap[i].SetActive(true);
                headerTitle(objectsToSwap[i].name);
            }else{
                objectsToSwap[i].SetActive(false);
            }
        }
    }

    public void ResetTabs()
    {
        foreach(TabButton button in tabButtons)
        {
            if(selectedTab !=null && button == selectedTab) {continue;}
            button.background.color = tabIdle;            
        }
    }

    void headerTitle(string title)
    {   
        switch (title)
        {
            case "AppPage":
                titleHeader.text = "Aplikasi";
                break;
            case "AchievementPage":
                titleHeader.text = "Pencapaian";
                break;
            case "ProfilePage":
                titleHeader.text = "Profile";
                break;  
            default:
                titleHeader.text = "Aplikasi";
                break;
        }
    }

}
