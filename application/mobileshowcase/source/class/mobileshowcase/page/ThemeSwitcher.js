/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christopher Zuendorf (czuendorf)

************************************************************************ */

/**
 * Mobile page responsible for switching between provided themes.
 */
qx.Class.define("mobileshowcase.page.ThemeSwitcher",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("Theme Switcher");
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
  },


  members :
  {
    __themes : [
      {"name":"Indigo","css":"../../../framework/source/resource/qx/mobile/css/indigo.css"},
      {"name":"Android","css":"../../../framework/source/resource/qx/mobile/css/android.css"},
      {"name":"iOS","css":"../../../framework/source/resource/qx/mobile/css/ios.css"}],
    
    
    // overridden
    _initialize : function()
    {
      this.base(arguments);
      
      
      this.getContent().add(new qx.ui.mobile.form.Title("Select your theme"));
      
      for(var i = 0; i < this.__themes.length; i++) {
         var label = this.__themes[i].name;
         var switchButton = new qx.ui.mobile.form.Button(label);
         switchButton.addListener("tap", this.__switchTheme, this);
         
         this.getContent().add(switchButton);
      }
    },
    
    
    /**
     * Changes the used CSS of the application.
     * @param cssFile {String} The css file url.
     * @param cssLinkIndex {String} index of the css link entry in head, which will be replaced.
     */
    __changeCSS : function(cssFile, cssLinkIndex) {
 
        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
 
        var newlink = document.createElement("link")
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);
 
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
     },
    
    
    /**
     * Switches the theme of the application to the target theme.
     * @param src {qx.ui.mobile.core.Widget} Source widget of this event.
     */
    __switchTheme : function(src) {
      var chosenValue = src.getTarget().getLabel();
      
      for(var i = 0; i < this.__themes.length; i++) {
        if(chosenValue == this.__themes[i].name) {
          this.__changeCSS(this.__themes[i].css,1);
        }
      }
    },


    // overridden
    _back : function()
    {
      qx.ui.mobile.navigation.Manager.getInstance().executeGet("/", {reverse:true});
    },
    
    
    /*
    *****************************************************************************
      DESTRUCTOR
    *****************************************************************************
    */
    destruct : function()
    {
      this._disposeObjects("__themes");
    }
  }
});