module.exports = {
  locals: function(options) {
    // Return custom template variables here.
    return {};
  },

  fileMapTokens: function(options) {
    // Return custom tokens to be replaced in your files
    return {
      __dumb__: function(options){
        // logic to determine value goes here
        return 'components';
      }
    }
  },

  // filesPath: function() {
  //   // if you want to store generated files in a folder named
  //   // something other than 'files' you can override this
  //   return path.join(this.path, 'files');
  // },

  // before and after install hooks
  // beforeInstall: function(options) {},
  // afterInstall: function(options) {},
};
