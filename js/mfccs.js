/***
* Transposed MFCC weight matrices for normalization.
* Numeric keys represent the number of filter banks.
* These are transposed from the matrices given in the VowelWorm MATLAB code
* @constant
*/
/**
 * @license
 * VowelWorm concept and VowelWorm._MFCC_WEIGHTS from Harald Frostel, Andreas
 * Arzt, and Gerhard Widmer at the Department of Computational Perception
 * Johannes Kepler University, Linz, Austria.
 * http://www.cp.jku.at/projects/realtime/vowelworm.html
 *
 */
var _MFCC_WEIGHTS = {
    25: {
        height_no_f0: new Float32Array([
            1.104270, 0.120389, 0.271996, 0.246571, 0.029848, -0.489273, -0.734283,
            -0.796145, -0.441830, -0.033330, 0.415667, 0.341943, 0.380445, 0.260451,
            0.092989, -0.161122, -0.173544, -0.015523, 0.251668, 0.022534, 0.054093,
            0.005430, -0.035820, -0.057551, 0.161558
        ]),
        backness: new Float32Array([
            0.995437, 0.540693, 0.121922, -0.585859, -0.443847, 0.170546, 0.188879,
            -0.306358, -0.308599, -0.212987, 0.012301, 0.574838, 0.681862, 0.229355,
            -0.222245, -0.222203, -0.129962, 0.329717, 0.142439, -0.132018, 0.103092,
            0.052337, -0.034299, -0.041558, 0.141547
        ])
    }
};


function getMFCCs(options) {
    var fft = null;
    fft = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(fft);
    // we need to ensure that these are all positive values
    var tmpFFT = [];
    for (var i = 0; i < fft.length; i++) {
        tmpFFT[i] = Math.abs(fft[i]);
    }
    fft = tmpFFT;
    var filterBanks = [],
        noFilterBanks = options.filterBanks, NFFT = analyser.fftSize, minFreq = options.minFreq, maxFreq = options.maxFreq, sampleRate = context.sampleRate;
        filterBanks = initFilterBanks(NFFT, noFilterBanks, minFreq, maxFreq, sampleRate);
        // get log coefficients
        var preDCT = []; // Initialise pre-discrete cosine transformation vetor array
        var postDCT = [];// Initialise post-discrete cosine transformation vetor array / MFCC Coefficents
        // Map the spectrum to the mel scale (apply triangular filters)
        for (var i = 0; i < filterBanks.length; i++) {
            var val = 0.0;
            for (var j = 0; j < filterBanks[i].length; j++) {
                val += (filterBanks[i][j]) * fft[j];
            }
            preDCT.push(Math.log10(val)); // Compute the log of the spectrum
        }
        // Perform the Discrete Cosine Transformation
        for (var i = 0; i < filterBanks.length; i++) {
            var val = 0;
            for (var j = 0; j < preDCT.length; j++) {
                val += preDCT[j] * Math.cos(i * (j + 0.5) * Math.PI / filterBanks.length);
            }
            // Perform scaling used by matlab implementation of dct
            if (i == 0) {
                val /= Math.sqrt(2.0);
            }
            val *= Math.sqrt(2.0 / filterBanks.length);
            postDCT.push(val);
        }
        return postDCT;
};


var initFilterBanks = function (NFFT, noFilterBanks, minFreq, maxFreq, sampleRate) {
    var filterBanks = [];
    var Nspec = NFFT / 2;
    var totalFilters = noFilterBanks;
    var minMel = 1127.01048 * Math.log(1.0 + minFreq / 700.0);
    var maxMel = 1127.01048 * Math.log(1.0 + maxFreq / 700.0);
    var dMel = (maxMel - minMel) / (noFilterBanks + 1);
    var melSpacing = [];
    var fftFreqs2Mel = [];
    var lower = [];
    var center = [];
    // Init melSpacing
    for (var i = 0; i < noFilterBanks + 2; i++) {
        var mel = minMel + i * dMel;
        melSpacing.push(mel);
    }
    // Init fftFreqs2Mel
    for (var i = 0; i < Nspec; i++) {
        var fftFreq = i * sampleRate / NFFT;
        var fftFreq2Mel = Math.log(1 + fftFreq / 700) * 1127.01048;
        fftFreqs2Mel.push(fftFreq2Mel);
    }
    // Init lower
    for (var i = 0; i < noFilterBanks; i++) {
        lower.push(melSpacing[i]);
    }
    // Init center
    for (var i = 1; i < noFilterBanks + 1; i++) {
        center.push(melSpacing[i]);
    }
    // Prepare the mel scale filterbank
    for (var i = 0; i < totalFilters; i++) {
        var fBank = [];
        for (var j = 0; j < Nspec; j++) {
            var val = Math.max(0.0, (1 - Math.abs(fftFreqs2Mel[j] - center[i]) / (center[i] - lower[i])));
            fBank.push(val);
        }
        filterBanks.push(fBank);
    }
    return filterBanks;
};


function regression(coefficients, transposed_weights) {
    if (coefficients.length !== transposed_weights.length) {
        throw new Error("coefficients and transposed_weights must be equal in " +
                        "length when using the regression normalization method. " +
                            "Coefficient length: " + coefficients.length + ". Weights length: " +
                                transposed_weights.length);
    }
    var sum = 0;
    for (var i = 0; i < coefficients.length; i++) {
        sum += coefficients[i] * transposed_weights[i];
    }
    return sum;
}


function normalize(formants) {
    if (!formants.length) {
        return [];
    }
    var x = null;
    var y = null;
    if (_MFCC_WEIGHTS[formants.length] === undefined) {
        throw new Error("No weights found for coefficients of length " +
                        formants.length + ". If you are using getMFCCs, make sure the " +
                            "amount of filter banks you are looking for corresponds to one of " +
                                "the keys found in VowelWorm._MFCC_WEIGHTS.");
    }
    var coefficients = formants.slice(); // makes a copy
    // Don't use the first MFCC, but replace it with 1 (necessary for regression DC coefficient)
    coefficients[0] = 1;
    x = regression(coefficients, _MFCC_WEIGHTS[coefficients.length].backness);
    y = regression(coefficients, _MFCC_WEIGHTS[coefficients.length].height_no_f0);
    if (x === null || y === null) {
        return [];
    }
    return [x, y];
};
