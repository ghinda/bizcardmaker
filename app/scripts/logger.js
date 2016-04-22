/**
 * Send JavaScript error information to Google Analytics.
 *
 * @param  {Window} window A reference to the "window".
 * @return {void}
 * @author Philippe Sawicki <https://github.com/philsawicki>
 */
(function (window) {
    'use strict';

    // Retain a reference to the previous global error handler, in case it has been set:
    var originalWindowErrorCallback = window.onerror;

    /**
     * Log any script error to Google Analytics.
     *
     * Third-party scripts without CORS will only provide "Script Error." as an error message.
     *
     * @param  {String}           errorMessage Error message.
     * @param  {String}           url          URL where error was raised.
     * @param  {Number}           lineNumber   Line number where error was raised.
     * @param  {Number|undefined} columnNumber Column number for the line where the error occurred.
     * @param  {Object|undefined} errorObject  Error Object.
     * @return {Boolean}                       When the function returns true, this prevents the
     *                                         firing of the default event handler.
     */
    window.onerror = function customErrorHandler (errorMessage, url, lineNumber, columnNumber, errorObject) {
        // only track events from our scripts
        url = url || '';
        if(url.indexOf('//www.bizcardmaker.com/') === -1) {
          return;
        }

        // Send error details to Google Analytics, if the library is already available:
        if (typeof ga === 'function') {
            // In case the "errorObject" is available, use its data, else fallback
            // on the default "errorMessage" provided:
            var exceptionDescription = errorMessage;
            if (typeof errorObject !== 'undefined' && typeof errorObject.message !== 'undefined') {
                exceptionDescription = errorObject.message;
            }

            // Format the message to log to Analytics (might also use "errorObject.stack" if defined):
            exceptionDescription += ' @ ' + url + ':' + lineNumber + ':' + columnNumber;

            ga('send', 'exception', {
                'exDescription': exceptionDescription
            });
        }

        // If the previous "window.onerror" callback can be called, pass it the data:
        if (typeof originalWindowErrorCallback === 'function') {
            return originalWindowErrorCallback(errorMessage, url, lineNumber, columnNumber, errorObject);
        }
        // Otherwise, Let the default handler run:
        return false;
    };
})(window);
