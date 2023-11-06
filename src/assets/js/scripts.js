$(function() {
    //uzimanje vrijednosti spola na ready
    var spol = $("input[type=radio]:checked").val();
    
    if (spol == 'm') {
        setSpolRezultat('Muškarac');
    } else {
        setSpolRezultat('Žena');
    }

    var dob;
    var visina;
    var masa;
    var struk;
    var bokovi;
    var glukoza;
    var inzulin;
    var ukupniKol;
    var ldlKol;
    var hdlKol;
    var trigliceridi;
    var stupanjBMI;
    var stupanjWHR;
    var stupanjBMP;
    var stupanjWHR2;
    var stupanjGlukoza;
    var stupanjKolesterol;
    var stupanjLDL;
    var stupanjHDL;
    var stupanjTrigliceridi;
    var stupanjHomaIr;
    var stupanjHomaBeta;

    function calculateTotalRisk() {
        return stupanjGlukoza
            + stupanjKolesterol
            + stupanjLDL
            + stupanjHDL
            + stupanjTrigliceridi
            + stupanjHomaIr
            + stupanjHomaBeta
            + stupanjWHR2
            + stupanjBMP
            + stupanjWHR
            + stupanjBMI;
    }

    var ukupniRizikPostotak;

    function provjeriInzulin() {
        if ($('#inzulinId').val() == '') {
            return 28;
        } else {
            return 36;
        }
    }

    function Postotak() {
        if ($('#inzulinId').val() == '') {
            ukupniRizikPostotak = ((calculateTotalRisk()/provjeriInzulin())*100).toFixed(0);
        } else {
            ukupniRizikPostotak = ((calculateTotalRisk()/provjeriInzulin())*100).toFixed(0);
        }
        return ukupniRizikPostotak;
    }

    $('#dob, #visina, #masa, #struk, #bokovi, #glukozaId, #inzulinId, #ukupniKolId, #hdlKolId, #ldlKolId, #trigliceridiId').on('keyup', function () {
        $(this).val(brisiTocku($(this).val()));
    });

    $('#dob').on('change', function () {
        dob = $(this).val();
        dob = zamjeniZarezSTockom(dob);

        if (!$.isNumeric(dob)) {
            $(this).val('');
            dob = '';
        }

        dob = parseFloat(dob);
    });

    $('#visina').on('change', function () {
        visina = $(this).val();
        visina = zamjeniZarezSTockom(visina);

        if (!$.isNumeric(visina)) {
            $(this).val('');
            visina = '';
        }

        visina = parseFloat(visina);
    });

    $('#masa').on('change', function () {
        masa = $(this).val();
        masa = zamjeniZarezSTockom(masa);

        if (!$.isNumeric(masa)) {
            $(this).val('');
            masa = '';
        }

        masa = parseFloat(masa);
    });

    $('#struk').on('change', function () {
        struk = $(this).val();
        struk = zamjeniZarezSTockom(struk);

        if (!$.isNumeric(struk)) {
            $(this).val('');
            struk = '';
        }

        struk = parseFloat(struk);
    });

    $('#bokovi').on('change', function () {
        bokovi = $(this).val();
        bokovi = zamjeniZarezSTockom(bokovi);

        if (!$.isNumeric(bokovi)) {
            $(this).val('');
            bokovi = '';
        }

        bokovi = parseFloat(bokovi);
    });

    $('#glukozaId').on('change', function () {
        glukoza = $(this).val();
        glukoza = zamjeniZarezSTockom(glukoza);

        if (!$.isNumeric(glukoza)) {
            $(this).val('');
            glukoza = '';
        }

        glukoza = parseFloat(glukoza);
    });

    $('#inzulinId').on('change', function () {
        inzulin = $(this).val();
        inzulin = zamjeniZarezSTockom(inzulin);

        if (!$.isNumeric(inzulin)) {
            $(this).val('');
            inzulin = '';
        }

        inzulin = parseFloat(inzulin);
    });

    $('#ukupniKolId').on('change', function () {
        ukupniKol = $(this).val();
        ukupniKol = zamjeniZarezSTockom(ukupniKol);

        if (!$.isNumeric(ukupniKol)) {
            $(this).val('');
            ukupniKol = '';
        }

        ukupniKol = parseFloat(ukupniKol);
    });

    $('#ldlKolId').on('change', function () {
        ldlKol = $(this).val();
        ldlKol = zamjeniZarezSTockom(ldlKol);

        if (!$.isNumeric(ldlKol)) {
            $(this).val('');
            ldlKol = '';
        }

        ldlKol = parseFloat(ldlKol);
    });

    $('#hdlKolId').on('change', function () {
        hdlKol = $(this).val();
        hdlKol = zamjeniZarezSTockom(hdlKol);

        if (!$.isNumeric(hdlKol)) {
            $(this).val('');
            hdlKol = '';
        }

        hdlKol = parseFloat(hdlKol);
    });

    $('#trigliceridiId').on('change', function () {
        trigliceridi = $(this).val();
        trigliceridi = zamjeniZarezSTockom(trigliceridi);

        if (!$.isNumeric(trigliceridi)) {
            $(this).val('');
            trigliceridi = '';
        }

        trigliceridi = parseFloat(trigliceridi);
    });

    function brisiTocku(str) {
        return str.replace('.', '');
    }

    function zamjeniZarezSTockom(str) {
        return str.replace(',', '.');
    }

    // Na promjenu parametra koji imaju klasu '.calculateBmi' izvrši sljedeće:
    $('.calculateBmi').on('change', function () {
        if (provjeriBmiParametre()) {
            var bmi = racunajBmi();
            //var visina = parseFloat($('#visina').val());
            var heightkvadrat = visina * visina;
            var bodyFatPostotak;
            var prepTjelesnaMasa;
            var spol = getSpol();

            $('#mailDob').val(dob);
            $('#mailVisina').val(visina);

            // Postotak tjelesne masti
            if (spol == 'm') {
                bodyFatPostotak = ((1.2 * bmi) + (0.23 * dob) - 5.4 - (10.8 * 1)).toFixed(0);

                if (bodyFatPostotak <= 6) {
                    porukaBFP = '<span style="color:green;">Rizik u odnosu na postotak tjelesnih masti: Nizak</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 0;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (7 <= bodyFatPostotak && bodyFatPostotak <= 13) {
                    porukaBFP = '<span style="color:green;">Rizik u odnosu na postotak tjelesnih masti: Nizak</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 0;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (14 <= bodyFatPostotak && bodyFatPostotak <= 17) {
                    porukaBFP = '<span style="color:green;">Rizik u odnosu na postotak tjelesnih masti: Normalan</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 1;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (18 <= bodyFatPostotak && bodyFatPostotak <= 22) {
                    porukaBFP = '<span style="color:tomato;">Rizik u odnosu na postotak tjelesnih masti: Povišen</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 2;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (23 <= bodyFatPostotak && bodyFatPostotak <= 29) {
                    porukaBFP = '<span style="color:tomato;">Rizik u odnosu na postotak tjelesnih masti: Povišen</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 3;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else {
                    porukaBFP = '<span style="color:red;">Rizik u odnosu na postotak tjelesnih masti: Visok</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 4;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                }
            } else {
                bodyFatPostotak = ((1.2 * bmi) + (0.23 * dob) - 5.4).toFixed(0);

                if (bodyFatPostotak <= 13) {
                    porukaBFP = '<span style="color:green;">Rizik u odnosu na postotak tjelesnih masti: Nizak</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 0;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (14 <= bodyFatPostotak && bodyFatPostotak <= 20) {
                    porukaBFP = '<span style="color:green;">Rizik u odnosu na postotak tjelesnih masti: Nizak</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 0;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (21 <= bodyFatPostotak && bodyFatPostotak <= 25) {
                    porukaBFP = '<span style="color:green;">Rizik u odnosu na postotak tjelesnih masti: Normalan</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 1;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (26 <= bodyFatPostotak && bodyFatPostotak <= 31) {
                    porukaBFP = '<span style="color:tomato;">Rizik u odnosu na postotak tjelesnih masti: Povišen</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 2;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else if (32 <= bodyFatPostotak && bodyFatPostotak <= 39) {
                    porukaBFP = '<span style="color:tomato;">Rizik u odnosu na postotak tjelesnih masti: Povišen</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 3;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                } else {
                    porukaBFP = '<span style="color:red;">Rizik u odnosu na postotak tjelesnih masti: Visok</span>';
                    $('.bodyFatOpis').html('<span style="font-weight: bold;">BFP opis: </span>' + porukaBFP);
                    stupanjBMP = 4;
                    $('.stupanjBodyFat').html('<span style="font-weight: bold;">Stupanj BFP rizika: </span>' + stupanjBMP);
                }
            }

            prepTjelesnaMasa = (((heightkvadrat)/10000) * 21.75).toFixed(0);

            $('#mailPrepTjelesnaMasa').val(prepTjelesnaMasa);
            $('#mailBodyFatPostotak').val(bodyFatPostotak);
            $('#mailPorukaBFP').val(porukaBFP);
            $('#mailStupanjBMP').val(stupanjBMP);

            $('.bfpRezultat').html('<span style="font-weight: bold;">BFP (Body Fat Percentage): </span>' + bodyFatPostotak + '%');
            $('.godineRezultat').html('<span style="font-weight: bold;">Dob: </span>' + dob + ' godina');
            $('#resultVisina').html('<span style="font-weight: bold;">Visina: </span>' + visina + 'cm');
            $('#resultMasa').html('<span style="font-weight: bold;">Masa: </span>' + masa + 'kg');

            // ako godine nisu unesene ukloni dob i bfp iz rezultata
            if (dob == '') {
                $('.godineRezultat').html('');
                $('.bfpRezultat').html('');
            } else {
                $('.godineRezultat').show();
                $('.bfpRezultat').show();
            }
            
            $('.prepTMRezultat').html('<span style="font-weight: bold;">Preporučena tjelesna masa: </span>' + prepTjelesnaMasa + 'kg');

            // Prikaži rezultat na stranici, bmi zaokruži na 2 decimale
            setBmiIndex(bmi.toFixed(2));
        } else {
            // Ukloni rezultat sa stranice
            $("#bmiIndexFirstPage").html('');
        }

        var poruka1 = '';
        var poruka2 = '';

        if (bmi < 18.4) {
            poruka1 = '<span style="color:tomato;">Tjelesna masa ispod preporučene</span>';
            poruka2 = '<span style="color:green;">Rizik u odnosu na BMI: Nizak</span>';
            $('.bmiTablicaRezultat').html('BMI rizik: ' + poruka2);
            $('.bmiTablicaOpis').show();
            $('.bmiTablicaRezultat').show();
            stupanjBMI = 0;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        } else if (18.5 <= bmi && bmi < 24.9) {
            poruka1 = '<span style="color:green;">Idealna tjelesna masa</span>';
            poruka2 = '<span style="color:green;">Rizik u odnosu na BMI: Normalan</span>';
            $('.bmiTablicaRezultat').html('BMI rizik: ' + poruka2);
            $('.bmiTablicaOpis').show();
            $('.bmiTablicaRezultat').show();
            stupanjBMI = 0;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        } else if (25 <= bmi && bmi < 29.9) {
            poruka1 = '<span style="color:tomato;">Povišena tjelesna masa</span>';
            poruka2 = '<span style="color:tomato;">Rizik u odnosu na BMI: Povišen</span>';
            $('.bmiTablicaRezultat').html('BMI rizik: ' + poruka2);
            $('.bmiTablicaOpis').show();
            $('.bmiTablicaRezultat').show();
            stupanjBMI = 1;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        } else if (30 <= bmi && bmi < 34.9) {
            poruka1 = '<span style="color:red;">Prekomjerna tjelesna masa (gojaznost, pretilost) 1. stupnja!!!</span>';
            poruka2 = '<span style="color:red;">Rizik u odnosu na BMI: Visok</span>';
            $('.bmiTablicaRezultat').html('BMI rizik: ' + poruka2);
            $('.bmiTablicaOpis').show();
            $('.bmiTablicaRezultat').show();
            stupanjBMI = 2;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        } else if (35 <= bmi && bmi < 45) {
            poruka1 = '<span style="color:red;">Prekomjerna tjelesna masa (gojaznost, pretilost) 2. stupnja!!!</span>';
            poruka2 = '<span style="color:red;">Rizik u odnosu na BMI: Visok</span>';
            $('.bmiTablicaRezultat').html('BMI rizik: ' + poruka2);
            $('.bmiTablicaOpis').show();
            $('.bmiTablicaRezultat').show();
            stupanjBMI = 3;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        } else if (45 <= bmi) {
            poruka1 = '<span style="color:red;">Prekomjerna tjelesna masa (gojaznost, pretilost) 2. stupnja!!!</span>';
            poruka2 = '<span style="color:red;">Rizik u odnosu na BMI: Visok</span>';
            $('.bmiTablicaRezultat').html('BMI rizik: ' + poruka2);
            $('.bmiTablicaOpis').show();
            $('.bmiTablicaRezultat').show();
            stupanjBMI = 4;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        } else {
            $('.bmiTablicaOpis').hide();
            $('.bmiTablicaRezultat').hide();
            stupanjBMI = 4;
            $('.stupanjBMI').html('Stupanj BMI rizika: ' + stupanjBMI);
        }

        setPoruka1(poruka1);

        $('#mailPoruka1').val(poruka1);
        $('#mailPoruka2').val(poruka2);
        $('#mailStupanjBMI').val(stupanjBMI);
    });

    function setPoruka1(poruka) {
        $('.bmiTablicaOpis').html('BMI opis: ' + poruka);
    }

    // Provjeri da li su zadani parametri
    function provjeriBmiParametre() {
        var valid = true;

        if ($('#visina').val() <= 0) {
            valid = false;
        }

        if ($('#masa').val() <= 0) {
            valid = false;
        }

        return valid;
    }

    // Računaj BMI 
    function racunajBmi() {
        
        //var masa = parseFloat($('#masa').val());

        $('#mailMasa').val(masa);

        return masa /(visina/100 * visina/100);
    }

    // Na promjenu parametra koji imaju klasu '.calculateWhr' izvrši sljedeće:
    $('.calculateWhr, .calculateBmi').on('change', function () {
        if (provjeriWhr2Parametre()) {
            var whr2 = racunajWhr2().toFixed(2);
            var spol = getSpol();
            //var struk = parseFloat($('#struk').val());
            //var bokovi = parseFloat($('#bokovi').val());

            $("#mailWhr2").val(whr2);

            // Prikaži rezultat na stranici, whr2 zaokruži na 2 decimale
            $('.whr2RezultatFirstPage').css("fontSize", 25).html('WHR (struk/visina): ' + whr2);
            $('.whr2Rezultat').html('<span style="font-weight: bold;">Omjer struka i visine: </span>' + whr2);
        } else {
            // Ukloni rezultat sa stranice
            $('.whr2RezultatFirstPage').html('');
            $('.whr2Rezultat').html('<span style="font-weight: bold;">Omjer struka i visine: </span>' + '<span style="color:tomato;">Ovaj parametar nismo u mogućnosti izračunati. Za rezultate ovog parametra upišite sve tražene tjelesne karakteristike.</span>');
        }

        if($('#struk').val() == '') {
            $('#mailStruk').val('Nedostaje parametar');
            $('#mailBokovi').val('Nedostaje parametar');
            $('#mailWhr2').val('Nedostaju parametri');
            $('#mailWhr').val('Nedostaju parametri');
        }

        if (spol == 'm') {
            if (whr2 <= 0.34) {
                stupanjWHR2 = 0;
            } else if (0.35 <= whr2 && whr2 < 0.41) {
                stupanjWHR2 = 0;
            } else if (0.42 <= whr2 && whr2 < 0.48) {
                stupanjWHR2 = 1;
            } else if (0.49 <= whr2 && whr2 < 0.53) {
                stupanjWHR2 = 2;
            } else if (0.54 <= whr2 && whr2 < 0.57) {
                stupanjWHR2 = 3;
            } else {
                stupanjWHR2 = 4;
            } 
        } else if (spol == 'f') {
            if (whr2 <= 0.34) {
                stupanjWHR2 = 0;
            } else if (0.35 <= whr2 && whr2 < 0.42) {
                stupanjWHR2 = 0;
            } else if (0.43 <= whr2 && whr2 < 0.52) {
                stupanjWHR2 = 1;
            } else if (0.53 <= whr2 && whr2 < 0.57) {
                stupanjWHR2 = 2;
            } else if (0.58 <= whr2 && whr2 < 0.62) {
                stupanjWHR2 = 3;
            } else {
                stupanjWHR2 = 4;
            }
        }
    });

    // Provjeri da li su zadani parametri
    function provjeriWhr2Parametre() {
        var valid = true;

        if ($('#struk').val() <= 0) {
            valid = false;
        }

        if ($('#visina').val() <= 0) {
            valid = false;
        }

        return valid;
    }

    // Računaj WHR2
    function racunajWhr2() {
        var struk2 = parseFloat($('#struk').val());
        var visina2 = parseFloat(visina);
        return struk2/visina2;
    }

    // Na promjenu parametra koji imaju klasu '.calculateWhr' izvrši sljedeće:
    $('.calculateWhr').on('change', function () {
        if (provjeriWhrParametre()) {
            var whr = racunajWhr();
            var porukaWHR;
            var spol = getSpol();

            $("#mailWhr").val(whr.toFixed(2));

            // WHR, poruka u odnosu na iznos i spol
            if (spol == 'm') {
                if (whr < 0.9) {
                    porukaWHR = '<span style="color:green;">Rizik nizak, tip gionidni, rizik za nastanak kardiovaskularnih bolesti nizak. U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.</span>';
                    $('.whrOpis').html('WHR opis ' + porukaWHR);
                    stupanjWHR = 1;
                } else if (0.91 < whr && whr < 0.99) {
                    porukaWHR = '<span style="color:green;">Rizik prosječan, tip gionidni, rizik za nastanak kardiovaskularnih bolesti normalan. U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.</span>';
                    $('.whrOpis').html('WHR opis ' + porukaWHR);
                    stupanjWHR = 2;
                } else {
                    porukaWHR = '<span style="color:red;">Rizik povišen, tip visceralni, rizik za nastanak kardiovaskularnih bolesti visok. U slučaju nakupljanja masnog tkiva, ono se nakuplja u području trbuha.</span>';
                    $('.whrOpis').html('WHR opis ' + porukaWHR);
                    stupanjWHR = 3;
                }
            } else if (spol == 'f') {
                if (whr < 0.8) {
                    porukaWHR = '<span style="color:green;">Rizik nizak, tip gionidni, rizik za nastanak kardiovaskularnih bolesti nizak. U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.</span>';
                    $('.whrOpis').html('WHR opis ' + porukaWHR);
                    stupanjWHR = 1;
                } else if (0.81 < whr && whr < 0.84) {
                    porukaWHR = '<span style="color:green;">Rizik prosječan, tip gionidni, rizik za nastanak kardiovaskularnih bolesti normalan. U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.</span>';
                    $('.whrOpis').html('WHR opis ' + porukaWHR);
                    stupanjWHR = 2;
                } else {
                    porukaWHR = '<span style="color:red;">Rizik povišen, tip visceralni, rizik za nastanak kardiovaskularnih bolesti visok. U slučaju nakupljanja masnog tkiva, ono se nakuplja u području trbuha.</span>';
                    $('.whrOpis').html('WHR opis ' + porukaWHR);
                    stupanjWHR = 3;
                }
            } else {
                porukaWHR = '<span style="color:red;">Za WHR opis odaberite spol.</span>';
                $('.whrOpis').html('WHR opis ' + porukaWHR);
            }
            //console.log(stupanjWHR);
            // Prikaži rezultat na stranici, whr zaokruži na 2 decimale
            $('.whrRezultatFirstPage').css("fontSize", 25).html('WHR (struk/bokovi): ' + whr.toFixed(2));
            $('.whrRezultat').html('<span style="font-weight: bold;">Omjer struka i bokova: </span>' + whr.toFixed(2));
        } else {
            // Ukloni rezultat sa stranice
            $('.whrRezultatFirstPage').html('');
            $('.whrRezultat').html('<span style="font-weight: bold;">Omjer struka i bokova: </span>' + '<span style="color:tomato;">Ovaj parametar nismo u mogućnosti izračunati. Za rezultate ovog parametra upišite sve tražene tjelesne karakteristike.</span>');
            $('#resultStruk').html('');
            $('#resultBokovi').html('');
        }
    });

    if($('#struk').val() == '') {
        $('.whrRezultat').html('<span style="font-weight: bold;">Omjer struka i bokova: </span>' + '<span style="color:tomato;">Ovaj parametar nismo u mogućnosti izračunati. Za rezultate ovog parametra upišite sve tražene tjelesne karakteristike.</span>');
    } 

    if($('#struk').val() == '') {
        $('.whr2Rezultat').html('<span style="font-weight: bold;">Omjer struka i visine: </span>' + '<span style="color:tomato;">Ovaj parametar nismo u mogućnosti izračunati. Za rezultate ovog parametra upišite sve tražene tjelesne karakteristike.</span>');
    }

    // Provjeri da li su zadani parametri
    function provjeriWhrParametre() {
        var valid = true;

        if ($('#struk').val() <= 0) {
            valid = false;
        }

        if ($('#bokovi').val() <= 0) {
            valid = false;
        }

        return valid;
    }

    // Računaj WHR1
    function racunajWhr() {
        //var struk = parseFloat($('#struk').val());
        //var bokovi = parseFloat($('#bokovi').val());

        $('#mailStruk').val(struk);
        $('#mailBokovi').val(bokovi);

        $('#resultStruk').html('<span style="font-weight: bold;">Opseg struka: </span>' + struk + 'cm');
        $('#resultBokovi').html('<span style="font-weight: bold;">Opseg bokova: </span>' + bokovi + 'cm');

        return struk/bokovi;
    }

    // KKS
    $('.calculateKks').on('change', function() {
        if (provjeriKksParametre()) {
            var homaIr = racunajHomaIr();
            var homaBeta = racunajHomaBeta();
            //var glukoza = parseFloat($('#glukozaId').val());
            //var inzulin = parseFloat($('#inzulinId').val());
            //var ukupniKol = parseFloat($('#ukupniKolId').val());
            //var hdlKol = parseFloat($('#hdlKolId').val());
            //var ldlKol = parseFloat($('#ldlKolId').val());
            //var trigliceridi = parseFloat($('#trigliceridiId').val());
            var spol = getSpol();
            var porukaHomaIr;
            var porukaHomaBeta;
            var ifelseRizik;
            var opisUkupniRizik;

            // Prikaži rezultat na stranici
            $('.homaIrRezultat').html('<span style="font-weight: bold;">HOMA - IR: </span>' + homaIr.toFixed(1));
            $('.homaBetaRezultat').html('<span style="font-weight: bold;">HOMA - β: </span>' + homaBeta);
            $('.glukozaRezultat').html('<span style="font-weight: bold;">Glukoza: </span>' + glukoza);
            $('.inzulinRezultat').html('<span style="font-weight: bold;">Inzulin: </span>' + inzulin);
            $('.ukupniKolRezultat').html('<span style="font-weight: bold;">Ukupni kolesterol: </span>' + ukupniKol);
            $('.ldlKolRezultat').html('<span style="font-weight: bold;">LDL ("loši") kolesterol: </span>' + ldlKol);
            $('.hdlKolRezultat').html('<span style="font-weight: bold;">HDL ("dobri") kolesterol: </span>' + hdlKol);
            $('.trigliceridiRezultat').html('<span style="font-weight: bold;">Trigliceridi: </span>' + trigliceridi);
        } else {
            // Ukloni rezultat sa stranice
            $('.homaIrRezultat').html('');
        }

        var mailHomaIr = homaIr ? homaIr.toFixed(1) : null;

        
        $('#mailHomaBeta').val(homaBeta);
        $('#mailGlukoza').val(glukoza);
        
        $('#mailUkupniKol').val(ukupniKol);
        $('#mailHdlKol').val(hdlKol);
        $('#mailLdlKol').val(ldlKol);
        $('#mailTrigliceridi').val(trigliceridi);

        if($('#inzulinId').val() == '') {
            $('#mailInzulin').val('Nedostaje parametar');
            $('#mailHomaIr').val('Nedostaje vrijednost inzulina');
            $('#mailHomaBeta').val('Nedostaje vrijednost inzulina');
        } else {
            $('#mailInzulin').val(inzulin);
            $('#mailHomaIr').val(mailHomaIr);
            $('#mailHomaBeta').val(homaBeta);
        }

        // Računaj HomaIR
        function racunajHomaIr() {
            //var glukoza = parseFloat($('#glukozaId').val());
            //var inzulin = parseFloat($('#inzulinId').val());

            if ($('#inzulinId').val() == '') {
                return 0;
            } else {
                return ((glukoza * inzulin)/22.5);
            }
        }

        // Računaj HomaBeta
        function racunajHomaBeta() {
            //var glukoza = parseFloat($('#glukozaId').val());
            //var inzulin = parseFloat($('#inzulinId').val());

            if ($('#inzulinId').val() == '') {
                return 0;
            } else {
                return ((20 * inzulin)/(glukoza - 3.5)/100).toFixed(2);
            }
        }

        // Homa IR
        if (homaIr < 0.5) {
            porukaHomaIr = '<span style="color:tomato;">Povećana osjetljivost na inzulin – izrazito nizak rizik za nastanak inzulinske rezistencije.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Nizak</span>';
            $('.porukaHomaIrOpis').html('HOMA - IR: ' + porukaHomaIr);
            stupanjHomaIr = 0;
            $('.stupanjHomaIr').html('Stupanj HOMA - IR rizika: ' + stupanjHomaIr);
        } else if (0.5 <= homaIr && homaIr < 1.8) {
            porukaHomaIr = '<span style="color:green;">Normalna osjetljivost na inzulin – nizak rizik za nastanak inzulinske rezistencije.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Normalan</span>';
            $('.porukaHomaIrOpis').html('HOMA - IR: ' + porukaHomaIr);
            stupanjHomaIr = 1;
            $('.stupanjHomaIr').html('Stupanj HOMA - IR rizika: ' + stupanjHomaIr);
        } else if (1.8 <= homaIr && homaIr < 2.9) {
            porukaHomaIr = '<span style="color:tomato;">Smanjena osjetljivost na inzulin – blago povećan rizik za nastanak inzulinske rezistencije.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Blago povišen</span>';
            $('.porukaHomaIrOpis').html('HOMA - IR: ' + porukaHomaIr);
            stupanjHomaIr = 2;
            $('.stupanjHomaIr').html('Stupanj HOMA - IR rizika: ' + stupanjHomaIr);
        } else if (2.9 <= homaIr && homaIr < 4) {
            porukaHomaIr = '<span style="color:red;">Smanjena osjetljivost na inzulin – visok rizik za nastanak inzulinske rezistencije.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Povišen</span>';
            $('.porukaHomaIrOpis').html('HOMA - IR: ' + porukaHomaIr);
            stupanjHomaIr = 3;
            $('.stupanjHomaIr').html('Stupanj homa - IR rizika: ' + stupanjHomaIr);
        } else {
            porukaHomaIr = '<span style="color:red;">Izrazito visok rizik za nastanak inzulinske rezistencije – preddijabetičko stanje.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Visok</span>';
            $('.porukaHomaIrOpis').html('HOMA - IR: ' + porukaHomaIr);
            stupanjHomaIr = 4;
            $('.stupanjHomaIr').html('Stupanj HOMA - IR rizika: ' + stupanjHomaIr);
        }

        if($('#inzulinId').val() == '') {
            $('#mailPorukaHomaIr').val('Nedostaje vrijednost inzulina');
            $('#mailStupanjHomaIr').val('Nedostaje vrijednost inzulina');
        } else {
            $('#mailPorukaHomaIr').val(porukaHomaIr);
            $('#mailStupanjHomaIr').val(stupanjHomaIr);
        }
                
        //Homa Beta
        if (homaBeta < 0.12) {
            porukaHomaBeta = '<span style="color:green;">Normalna aktivnost beta otočića - izrazito nizak rizik za nastanak dijabetesa tipa 2.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Nizak</span>'; 
            $('.porukaHomaBetaOpis').html('HOMA - β: ' + porukaHomaBeta);
            stupanjHomaBeta = 0;
            $('.stupanjHomaBeta').html('Stupanj HOMA - β rizika: ' + stupanjHomaBeta);
        } else if (0.12 <= homaBeta && homaBeta < 0.5) {
            porukaHomaBeta = '<span style="color:green;">Normalna aktivnost beta otočića – nizak rizik za nastanak dijabetesa tipa 2.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Normalan</span>';
            $('.porukaHomaBetaOpis').html('HOMA - β: ' + porukaHomaBeta);
            stupanjHomaBeta = 1;
            $('.stupanjHomaBeta').html('Stupanj HOMA - β rizika: ' + stupanjHomaBeta);
        } else if (0.5 <= homaBeta && homaBeta < 0.56) {
            porukaHomaBeta = '<span style="color:tomato;">Smanjena aktivnost beta otočića – povišen rizik za nastanak dijabetesa tipa 2.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Blago povišen</span>';
            $('.porukaHomaBetaOpis').html('HOMA - β: ' + porukaHomaBeta);
            stupanjHomaBeta = 2;
            $('.stupanjHomaBeta').html('Stupanj HOMA - β rizika: ' + stupanjHomaBeta);
        } else if (0.56 <= homaBeta && homaBeta < 0.64) {
            porukaHomaBeta = '<span style="color:red;">Smanjena aktivnost beta otočića – visok rizik za nastanak dijabetesa tipa 2.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Povišen</span>';
            $('.porukaHomaBetaOpis').html('HOMA - β: ' + porukaHomaBeta);
            stupanjHomaBeta = 3;
            $('.stupanjHomaBeta').html('Stupanj HOMA - β rizika: ' + stupanjHomaBeta);
        } else {
            porukaHomaBeta = '<span style="color:red;">Izrazito smanjena aktivnost beta otočića – izrazito visok rizik za nastanak dijabetesa tipa 2.'+ '<br />' +'Rizik za kardiovaskularne bolesti - Visok</span>';
            $('.porukaHomaBetaOpis').html('HOMA - β: ' + porukaHomaBeta);
            stupanjHomaBeta = 4;
            $('.stupanjHomaBeta').html('Stupanj HOMA - β rizika: ' + stupanjHomaBeta);
        }

        if($('#inzulinId').val() == '') {
            $('#mailPorukaHomaBeta').val('Nedostaje vrijednost inzulina');
            $('#mailStupanjHomaBeta').val('Nedostaje vrijednost inzulina');
        } else {
            $('#mailPorukaHomaBeta').val(porukaHomaBeta);
            $('#mailStupanjHomaBeta').val(stupanjHomaBeta);
        }

        //Glukoza
        //var glukoza = parseFloat($('#glukozaId').val());
        if (glukoza < 4.5) {
            porukaGlukoza = 'Vrijednost ispod referentnih vrijednosti. Nalazite se u hipoglikemiji. Rizik za razvoj dijabetesa tipa 2: <span style="color:green;">Nizak</span> Rizik za razvoj kardiovaskularnih bolesti: <span style="color:green;">Nizak</span>';
            $('.porukaGlukozaOpis').html('Glukoza: ' + porukaGlukoza);
            stupanjGlukoza = 0;
            $('.stupanjGlukoza').html('Stupanj rizika Glukoza: ' + stupanjGlukoza);
        } else if (4.5 <= glukoza && glukoza < 6.5) {
            porukaGlukoza = 'Vrijednost unutar referentnih intervala. Rizik za razvoj dijabetesa tipa 2:<span style="color:#F9A825;">Normalan</span> Rizik za razvoj kardiovaskularnih bolesti: <span style="color:#F9A825;">Normalan</span>';
            $('.porukaGlukozaOpis').html('Glukoza: ' + porukaGlukoza);
            stupanjGlukoza = 1;
            $('.stupanjGlukoza').html('Stupanj rizika Glukoza: ' + stupanjGlukoza);
        } else if (6.5 <= glukoza && glukoza < 8.5) {
            porukaGlukoza = 'Vrijednost iznad referentnih vrijednosti. <span style="color:tomato;">Nalazite se u hiperglikemiji</span>'+ '<br />' +'Rizik za razvoj dijabetesa tipa 2: <span style="color:tomato;">Visok</span>'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'Vaša razina glukoze u krvi je visoka i zahtijeva hitno djelovanje! Nekontrolirana hiperglikemija u kratkom roku dovodi do dijabetesa tipa 2, visokog krvnog tlaka, debljanja, metaboličkog sindroma i raznih drugih bolesti. Stoga je potrebno djelovati na vrijeme.'+ '<br />' +'Za snižavanje glukoze u krvi i sprječavanje razvoja dijabetesa tipa 2 pomoći će Vam <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=104&amp;search=salengei&amp;limit=100"><span style="color:blue;">Salengei Active Resveratrol</span></a> kapsule sa 100% prirodnim ekstraktom korijena japanskog dvornika. Ovaj proizvod aktivira posebne GLUT4 receptore na stanicama i tako potiče unos glukoze ustanicu, i snižavanje njene razine u krvi.'+ '<br />' +'Salengei Active Resveratrol možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=104&amp;search=salengei&amp;limit=100"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.'+ '<br />' +'Za više informacija o proizvodu i savjete o načinu kontrole gukoze u krvi nazovite 021 688888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.porukaGlukozaOpis').html('Glukoza: ' + porukaGlukoza);
            stupanjGlukoza = 2;
            $('.stupanjGlukoza').html('Stupanj rizika Glukoza: ' + stupanjGlukoza);
        } else {
            porukaGlukoza = 'Vrijednost iznad referentnih vrijednosti. <span style="color:tomato;">Nalazite se u hiperglikemiji</span>'+ '<br />' +'Rizik za razvoj dijabetesa tipa 2: <span style="color:tomato;">Visok</span>'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'Vaša razina glukoze u krvi je visoka i zahtijeva hitno djelovanje! Nekontrolirana hiperglikemija u kratkom roku dovodi do dijabetesa tipa 2, visokog krvnog tlaka, debljanja, metaboličkog sindroma i raznih drugih bolesti. Stoga je potrebno djelovati na vrijeme.'+ '<br />' +'Za snižavanje glukoze u krvi i sprječavanje razvoja dijabetesa tipa 2 pomoći će Vam <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=104&amp;search=salengei&amp;limit=100"><span style="color:blue;">Salengei Active Resveratrol</span></a> kapsule sa 100% prirodnim ekstraktom korijena japanskog dvornika. Ovaj proizvod aktivira posebne GLUT4 receptore na stanicama i tako potiče unos glukoze ustanicu, i snižavanje njene razine u krvi.'+ '<br />' +'Salengei Active Resveratrol možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=104&amp;search=salengei&amp;limit=100"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.'+ '<br />' +'Za više informacija o proizvodu i savjete o načinu kontrole gukoze u krvi nazovite 021 688888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.porukaGlukozaOpis').html('Glukoza: ' + porukaGlukoza);
            stupanjGlukoza = 3;
            $('.stupanjGlukoza').html('Stupanj rizika Glukoza: ' + stupanjGlukoza);
        }

        $('#mailPorukaGlukoza').val(porukaGlukoza);
        $('#mailStupanjGlukoza').val(stupanjGlukoza);

        //Ukupni kolesterol
        //var ukupniKol = parseFloat($('#ukupniKolId').val());
        if (ukupniKol < 4) {
            porukaUkupniKol = 'Vrijednost unutar referentnih intervala.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:#F9A825;">Normalan</span>';
            $('.ukupniKolOpis').html('Ukupni kolesterol: ' + porukaUkupniKol);
            stupanjKolesterol = 0;
            $('.stupanjUkupniKol').html('Stupanj rizika ukupni kolesterol: ' + stupanjKolesterol);
        } else if (4 <= ukupniKol && ukupniKol < 5) {
            porukaUkupniKol = 'Vrijednost unutar referentnih intervala.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:#F9A825;">Normalan</span>';
            $('.ukupniKolOpis').html('Ukupni kolesterol: ' + porukaUkupniKol);
            stupanjKolesterol = 1;
            $('.stupanjUkupniKol').html('Stupanj rizika ukupni kolesterol: ' + stupanjKolesterol);
        } else if (5 <= ukupniKol && ukupniKol < 6) {
            porukaUkupniKol = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'Razina Vašeg kolesterola je povišena!'+ '<br />' +'Dugotrajna i nekontrolirana visoka razina kolesterola u krvi povećava rizikod nastanka ateroskleroze i plakova na žilama, visokog krvnog tlaka, dijabetesa tipa 2 i na kraju, srčanog i moždanog udara. Potrebno je djelovati na vrijeme jer sva navedena stanja mogu biti opasna po život!'+ '<br />' +'Za snižavanje ovih vrijednosti i sprječavanje srčanog incidenta pomoći će Vam <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">Udo&#39;s Oil Omega 3,6,9 Blend</span></a> – mješavina ulja bogata omega 3,6 i 9 masnim kiselinama koje dokazano smanjuju razinu kolesterola itriglicerida u krvi! Osim toga snizuju visoki krvni tlak, sprječavaju srčani i moždani udar, podižu energiju iomogućuju da se osjećate bolje! U kombinaciji s pravilno prilagođenom prehranom u dosadašnjem radu nam sepokazao kao najbolji proizvod za snižavanje razine kolesterola u krvi. Udo ulje možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.Za više informacija o proizvodu i savjete o kontroliranju razine kolesterola u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.ukupniKolOpis').html('Ukupni kolesterol: ' + porukaUkupniKol);
            stupanjKolesterol = 2;
            $('.stupanjUkupniKol').html('Stupanj rizika ukupni kolesterol: ' + stupanjKolesterol);
        } else {
            porukaUkupniKol = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'Razina Vašeg kolesterola je povišena!'+ '<br />' +'Dugotrajna i nekontrolirana visoka razina kolesterola u krvi povećava rizikod nastanka ateroskleroze i plakova na žilama, visokog krvnog tlaka, dijabetesa tipa 2 i na kraju, srčanog i moždanog udara. Potrebno je djelovati na vrijeme jer sva navedena stanja mogu biti opasna po život!'+ '<br />' +'Za snižavanje ovih vrijednosti i sprječavanje srčanog incidenta pomoći će Vam <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">Udo&#39;s Oil Omega 3,6,9 Blend</span></a> – mješavina ulja bogata omega 3,6 i 9 masnim kiselinama koje dokazano smanjuju razinu kolesterola itriglicerida u krvi! Osim toga snizuju visoki krvni tlak, sprječavaju srčani i moždani udar, podižu energiju iomogućuju da se osjećate bolje! U kombinaciji s pravilno prilagođenom prehranom u dosadašnjem radu nam sepokazao kao najbolji proizvod za snižavanje razine kolesterola u krvi. Udo ulje možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.Za više informacija o proizvodu i savjete o kontroliranju razine kolesterola u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.ukupniKolOpis').html('Ukupni kolesterol: ' + porukaUkupniKol);
            stupanjKolesterol = 3;
            $('.stupanjUkupniKol').html('Stupanj rizika ukupni kolesterol: ' + stupanjKolesterol);
        }

        $('#mailPorukaUkupniKol').val(porukaUkupniKol);
        $('#mailStupanjKolesterol').val(stupanjKolesterol);

        //LDL kolesterol
        //var ldlKol = parseFloat($('#ldlKolId').val());
        if (ldlKol < 1) {
            porukaldlKol = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:red;">Visok</span>';
            $('.ldlKolOpis').html('Opis: ' + porukaldlKol);
            stupanjLDL = 0;
            $('.stupanjLDLKol').html('Stupanj rizika LDL kolesterol: ' + stupanjLDL);
        } else if (1 <= ldlKol && ldlKol < 3) {
            porukaldlKol = '<span style="color:green;">Nalaz uredan'+ '<br />' +'Imate smanjen rizik od nastanka kardiovaskularnih bolesti</span>';
            $('.ldlKolOpis').html('Opis: ' + porukaldlKol);
            stupanjLDL = 1;
            $('.stupanjLDLKol').html('Stupanj rizika LDL kolesterol: ' + stupanjLDL);
        } else if (3 <= ldlKol && ldlKol < 5) {
            porukaldlKol = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'Razina Vašeg kolesterola je povišena!'+ '<br />' +'Dugotrajna i nekontrolirana visoka razina kolesterola u krvi povećava rizikod nastanka ateroskleroze i plakova na žilama, visokog krvnog tlaka, dijabetesa tipa 2 i na kraju, srčanog i moždanog udara. Potrebno je djelovati na vrijeme jer sva navedena stanja mogu biti opasna po život!'+ '<br />' +'Za snižavanje ovih vrijednosti i sprječavanje srčanog incidenta pomoći će Vam <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">Udo&#39;s Oil Omega 3,6,9 Blend</span></a> – mješavina ulja bogata omega 3,6 i 9 masnim kiselinama koje dokazano smanjuju razinu kolesterola itriglicerida u krvi! Osim toga snizuju visoki krvni tlak, sprječavaju srčani i moždani udar, podižu energiju iomogućuju da se osjećate bolje! U kombinaciji s pravilno prilagođenom prehranom u dosadašnjem radu nam sepokazao kao najbolji proizvod za snižavanje razine kolesterola u krvi. Udo ulje možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.Za više informacija o proizvodu i savjete o kontroliranju razine kolesterola u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.ldlKolOpis').html('Opis: ' + porukaldlKol);
            stupanjLDL = 2;
            $('.stupanjLDLKol').html('Stupanj rizika LDL kolesterol: ' + stupanjLDL);
        } else {
            porukaldlKol = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'Razina Vašeg kolesterola je povišena!'+ '<br />' +'Dugotrajna i nekontrolirana visoka razina kolesterola u krvi povećava rizikod nastanka ateroskleroze i plakova na žilama, visokog krvnog tlaka, dijabetesa tipa 2 i na kraju, srčanog i moždanog udara. Potrebno je djelovati na vrijeme jer sva navedena stanja mogu biti opasna po život!'+ '<br />' +'Za snižavanje ovih vrijednosti i sprječavanje srčanog incidenta pomoći će Vam <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">Udo&#39;s Oil Omega 3,6,9 Blend</span></a> – mješavina ulja bogata omega 3,6 i 9 masnim kiselinama koje dokazano smanjuju razinu kolesterola itriglicerida u krvi! Osim toga snizuju visoki krvni tlak, sprječavaju srčani i moždani udar, podižu energiju iomogućuju da se osjećate bolje! U kombinaciji s pravilno prilagođenom prehranom u dosadašnjem radu nam sepokazao kao najbolji proizvod za snižavanje razine kolesterola u krvi. Udo ulje možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.Za više informacija o proizvodu i savjete o kontroliranju razine kolesterola u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.ldlKolOpis').html('Opis: ' + porukaldlKol);
            stupanjLDL = 3;
            $('.stupanjLDLKol').html('Stupanj rizika LDL kolesterol: ' + stupanjLDL);
        }

        $('#mailPorukaldlKol').val(porukaldlKol);
        $('#mailStupanjLDL').val(stupanjLDL);
                
        //HDL kolesterol
        
        if (spol == 'm') {
            if (1 < hdlKol) {
                porukahdlKol = 'Vrijednost unutar referentnih intervala.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:#F9A825;">Normalan</span>';
                $('.hdlKolOpis').html('Opis: ' + porukahdlKol);
                stupanjHDL = 0;
                $('.stupanjHDLKol').html('Stupanj rizika HDL kolesterol: ' + stupanjHDL);
            } else {
                porukahdlKol = 'Vrijednost ispod referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'HDL kolesterol je tzv. „dobri“ kolesterol i uvelike pomaže u održavanju normalnih vrijednosti LDL, odnosno „lošeg“ kolesterola i trigliceriga u krvi. Pritom sprječava razvoj ozbiljnih bolesti srčano-krvožilnog sustava poput ateroskleroze i potpunog začepljenja krvnih žila. Zbog toga je bitno da nam razine HDL kolesterola budu što više. Niske vrijednosti HDL kolesterola zahtjevaju brzo djelovanje!'+ '<br />' +'Pravilna prehrana i <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei&amp;limit=100"><span style="color:blue;">Active More DHA</span></a> će Vam pomoći pri postizanju normalnih vrijednosti HDL kolesterola u krvi.'+ '<br />' +'Active More DHA je proizvod koji u jednoj kapsuli sadrži čak 700 mg DHA omega masne kiseline koja će pomoći pri snižavanju vrijednosti „lošeg“ kolesterola i podizanju vrijednosti „dobrog“. Ojačati će Vaše srce i krvne žile i omogućiti Vam da se osjećate manje umorno. <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei&amp;limit=100"><span style="color:blue;">Active More DHA</span></a> možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei&amp;limit=100"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.'+ '<br />' +'Za više informacija o proizvodu i besplatno savjetovanje o načinu podizanja razine HDL kolesterola u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
                $('.hdlKolOpis').html('Opis: ' + porukahdlKol);
                stupanjHDL = 1;
                $('.stupanjHDLKol').html('Stupanj rizika HDL kolesterol: ' + stupanjHDL);
            }
        } else {
            if (1.2 < hdlKol) {
                porukahdlKol = 'Vrijednost unutar referentnih intervala.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:#F9A825;">Normalan</span>';
                $('.hdlKolOpis').html('Opis: ' + porukahdlKol);
                stupanjHDL = 0;
                $('.stupanjHDLKol').html('Stupanj rizika HDL kolesterol: ' + stupanjHDL);
            } else {
                porukahdlKol = 'Vrijednost ispod referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:tomato;">Visok</span>'+ '<br />' +'HDL kolesterol je tzv. „dobri“ kolesterol i uvelike pomaže u održavanju normalnih vrijednosti LDL, odnosno „lošeg“ kolesterola i trigliceriga u krvi. Pritom sprječava razvoj ozbiljnih bolesti srčano-krvožilnog sustava poput ateroskleroze i potpunog začepljenja krvnih žila. Zbog toga je bitno da nam razine HDL kolesterola budu što više. Niske vrijednosti HDL kolesterola zahtjevaju brzo djelovanje!'+ '<br />' +'Pravilna prehrana i <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei&amp;limit=100"><span style="color:blue;">Active More DHA</span></a> će Vam pomoći pri postizanju normalnih vrijednosti HDL kolesterola u krvi.'+ '<br />' +'Active More DHA je proizvod koji u jednoj kapsuli sadrži čak 700 mg DHA omega masne kiseline koja će pomoći pri snižavanju vrijednosti „lošeg“ kolesterola i podizanju vrijednosti „dobrog“. Ojačati će Vaše srce i krvne žile i omogućiti Vam da se osjećate manje umorno. <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei&amp;limit=100"><span style="color:blue;">Active More DHA</span></a> možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei&amp;limit=100"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.'+ '<br />' +'Za više informacija o proizvodu i besplatno savjetovanje o načinu podizanja razine HDL kolesterola u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
                $('.hdlKolOpis').html('Opis: ' + porukahdlKol);
                stupanjHDL = 1;
                $('.stupanjHDLKol').html('Stupanj rizika HDL kolesterol: ' + stupanjHDL);
            }
        }

        $('#mailPorukaHdlKol').val(porukahdlKol);
        $('#mailStupanjHDL').val(stupanjHDL);

        //Trigliceridi
        //var trigliceridi = parseFloat($('#trigliceridiId').val());
        if (trigliceridi < 1.7) {
            porukaTrigliceridi = 'Vrijednost unutar referentnih intervala.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: <span style="color:green;">Normalan</span>';
            $('.trigliceridiOpis').html('Trigliceridi: ' + porukaTrigliceridi);
            stupanjTrigliceridi = 0;
            $('.stupanjTrigliceridi').html('Stupanj rizika trigliceridi: ' + stupanjTrigliceridi);
        } else if (1.7 <= trigliceridi && trigliceridi < 3) {
            porukaTrigliceridi = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: Visok'+ '<br />' +'Trigliceridi su zasićene masne kiseline koje se ugrađuju u stanice našeg organizma i čine ih ljepljivima i krutima. Prvo se ugrađuju u stanice krvnih žila koje potom postaju neelastične i podložne neželjenim promjenama.'+ '<br />' +'Kao prvi simptom ove pojave javlja se povišeni krvni tlak, a potom i ateroskleroza i povišene vrijednosti drugih parametara.'+ '<br />' +'Na kraju, ukoliko ne djelujemo na vrijeme, dolazi do začepljenja krvnih žila što može uzrokovati moždani ili srčani udar i prijevremenu smrt. Povišene vrijednosti triglicerida nisu uvijek praćene povišenim vrijednostima kolesterola i glukoze u krvi, ali ukoliko se ne djeluje na vrijeme, uvijek vode ka tome.'+ '<br />' +'Prvi korak prevencije je pravilna i uravnotežena prehrana praćena pravom suplementacijom. <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">Salengei Active Cardisterol</span></a> je jedini proizvod koji djeluje na sva područja zdravlja srčano - krvožilnog sustava. Snizuje razinu trigliceriga u krvi i sprječava daljnje promjene na krvnim žilama. Snizuje razinu „lošeg“, a povisuje razinu „dobrog“ kolesterola, snizuje krvni tlak i poboljšava cirkulaciju. <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">Salengei Active Cardisterol</span></a> možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.'+ '<br />' +'Za više informacija o proizvodu i besplatno savjetovanje o načinu reguliranja razine triglicerida u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.trigliceridiOpis').html('Trigliceridi: ' + porukaTrigliceridi);
            stupanjTrigliceridi = 1;
            $('.stupanjTrigliceridi').html('Stupanj rizika trigliceridi: ' + stupanjTrigliceridi);
        } else {
            porukaTrigliceridi = 'Vrijednost iznad referentnih vrijednosti.'+ '<br />' +'Rizik za razvoj kardiovaskularnih bolesti: Visok'+ '<br />' +'Trigliceridi su zasićene masne kiseline koje se ugrađuju u stanice našeg organizma i čine ih ljepljivima i krutima. Prvo se ugrađuju u stanice krvnih žila koje potom postaju neelastične i podložne neželjenim promjenama.'+ '<br />' +'Kao prvi simptom ove pojave javlja se povišeni krvni tlak, a potom i ateroskleroza i povišene vrijednosti drugih parametara.'+ '<br />' +'Na kraju, ukoliko ne djelujemo na vrijeme, dolazi do začepljenja krvnih žila što može uzrokovati moždani ili srčani udar i prijevremenu smrt. Povišene vrijednosti triglicerida nisu uvijek praćene povišenim vrijednostima kolesterola i glukoze u krvi, ali ukoliko se ne djeluje na vrijeme, uvijek vode ka tome.'+ '<br />' +'Prvi korak prevencije je pravilna i uravnotežena prehrana praćena pravom suplementacijom. <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">Salengei Active Cardisterol</span></a> je jedini proizvod koji djeluje na sva područja zdravlja srčano - krvožilnog sustava. Snizuje razinu trigliceriga u krvi i sprječava daljnje promjene na krvnim žilama. Snizuje razinu „lošeg“, a povisuje razinu „dobrog“ kolesterola, snizuje krvni tlak i poboljšava cirkulaciju. <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">Salengei Active Cardisterol</span></a> možete kupiti <a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">ovdje</span></a> ili u našoj trgovini u Lovretskoj 10 u Splitu.'+ '<br />' +'Za više informacija o proizvodu i besplatno savjetovanje o načinu reguliranja razine triglicerida u krvi nazovite 021 688 888 ili nas kontaktirajte mailom na nutricionist@mcanaliza.org';
            $('.trigliceridiOpis').html('Trigliceridi: ' + porukaTrigliceridi);
            stupanjTrigliceridi = 3;
            $('.stupanjTrigliceridi').html('Stupanj rizika trigliceridi: ' + stupanjTrigliceridi);
        }

        $('#mailPorukaTrigliceridi').val(porukaTrigliceridi);
        $('#mailStupanjTrigliceridi').val(stupanjTrigliceridi);
        
        //console.log(stupanjTrigliceridi);

    });
    // Provjeri dali su zadani parametri
    function provjeriKksParametre() {
        var valid = true;

        if ($('#glukozaId').val() <= 0) {
            valid = false;
        }

        if ($('#izulinId').val() <= 0) {
            valid = false;
        }

        if ($('#ukupniKolId').val() <= 0) {
            valid = false;
        }

        if ($('#hldKolId').val() <= 0) {
            valid = false;
        }

        if ($('#ldlKolId').val() <= 0) {
            valid = false;
        }

        if ($('#trigliceridiId').val() <= 0) {
            valid = false;
        }

        return valid;
    }

    // Uzimanje vrijednosti spola
    $("#muskarac, #zena").change(function () {
        var spol = getSpol();

        if (spol == 'm') {
            setSpolRezultat('Muškarac');
        } else {
            setSpolRezultat('Žena');
        }
    });

    function getSpol() {
        if ($('#muskarac').prop('checked')) {
            return 'm';
        } else if ($('#zena').prop('checked')) {
            return 'f';
        } else {
            return false;
        }
    }

    function setSpolRezultat(spol) {
        $("#resultspola").html('<span style="font-weight: bold;">Spol: </span>' + spol);
        $("#mailSpol").val(spol);
    }

    function setBmiIndex(bmiIndex) {
        $("#bmiRezultat").css("fontSize", 20).html('BMI (Body Mass Index): ' + bmiIndex);
        $("#bmiIndexFirstPage").css("fontSize", 25).html('BMI: ' + bmiIndex);
        $("#mailBmiIndex").val(bmiIndex);
    }

    var mailPušač = 'Pušač';
    var mailDijabetes = 'Dijabetes';
    var mailIncident = 'Kardiovaskularni incident';
    //uzimanje vrijednosti checkboxa
    $('input[id="fancy-checkbox-danger"]').on('click', function(){
        if ( $(this).prop('checked') ) {
            $("#rez-fancy-checkbox-danger").html('Pušač');
            $("#rez-fancy-checkbox-danger").show();
            $('#mailPušač').val(mailPušač);
        } else {
            $("#rez-fancy-checkbox-danger").hide();
            $('#mailPušač').hide();
        }
    });

    $('input[id="fancy-checkbox-danger1"]').on('click', function() {
        if ( $(this).prop('checked') ) {
            $("#rez-fancy-checkbox-danger1").html('Dijabetes');
            $("#rez-fancy-checkbox-danger1").show();
            $('#mailDijabetes').val(mailDijabetes);
        } else {
            $("#rez-fancy-checkbox-danger1").hide();
            $('#mailDijabetes').hide();
        }
    });

    $('input[id="fancy-checkbox-danger2"]').on('click', function(){
        if ( $(this).prop('checked') ) {
            $("#rez-fancy-checkbox-danger2").html('Kardiovaskularni incident');
            $("#rez-fancy-checkbox-danger2").show();
            $('#mailIncident').val(mailIncident);
        } else {
            $("#rez-fancy-checkbox-danger2").hide();
            $('#mailIncident').hide();
        }
    });

    function scroll_to_class(element_class, removed_height) {
        var scroll_to = $(element_class).offset().top - removed_height;
        if($(window).scrollTop() != scroll_to) {
            $('html, body').stop().animate({scrollTop: scroll_to}, 0);
        }
    }

    function bar_progress(progress_line_object, direction) {
        var number_of_steps = progress_line_object.data('number-of-steps');
        var now_value = progress_line_object.data('now-value');
        var new_value = 0;
        
        if(direction == 'right') {
            new_value = now_value + ( 100 / number_of_steps );
        } else if(direction == 'left') {
            new_value = now_value - ( 100 / number_of_steps );
        }

        progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
    }

    /*
        Fullscreen background
    */
    $.backstretch("assets/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
        $.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
        $.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    // next step
    $('.f1 .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');
        var isValid = true;
        var isValidMjere = true;

        $('input[type="text"].required').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).addClass('input-error').attr("placeholder", "Upisivanje ovog parametra je obavezno!").val('');
            } else {
                $(this).removeClass('input-error');
            } 
            
        });

        $('.mjere').each(function() {
            if ($.trim($(this).val()) == '') {
                isValidMjere = false;
                $(this).addClass('input-error').attr("placeholder", "Upisivanje ovog parametra je obavezno!").val('');
            } else {
                $(this).removeClass('input-error');
            } 
            
        });

        if (isValid == false) {
            $('.faliNalaz').html('Procjena rizika nije moguća bez rezultata laboratorijskih pretraga. Molimo Vas nazovite 021 688 888 i dogovorite laboratorijske pretrage.');
            $('.faliNalaz').show();
            $("#rezultatiKKS").hide();
            $('#rezultatiBmiWhr').hide();
            
        } else {
            $('#rezultatiBmiWhr').show();
            $("#rezultatiKKS").show();
            $('.faliNalaz').hide();
            $('#ukupniRizik').css("fontSize", 20).html('Vaš ukupni stupanj rizika je: ');
            $('#ukupniRizikBroj').css("fontSize", 50).css('text-align','center').css('padding','15px').html(calculateTotalRisk() + '/' + provjeriInzulin() + '(' + Postotak() + '%)');
        }

        if (isValidMjere == false) {
            $('.faleMjere').html('Za izračun BMI i WHR unesite Vašu dob i tjelesne karakteristike.');
            $('.faleMjere').show();
        } else {
            $('.faleMjere').hide();
        }
        
        if ( next_step && isValid && isValidMjere) {
            parent_fieldset.fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                // progress bar
                bar_progress(progress_line, 'right');
                // show next step
                $(this).next().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class( $('.f1'), 20 );
            });
        }

        var ifelseRizik = calculateTotalRisk();
        if (ifelseRizik <= 1) {
            opisUkupniRizik = '<span style="color:green;">Imate izrazito nizak rizik za nastanak kardiovaskularnih bolesti i dijabetesa tipa 2.' + '<br />' + 'Pravilna prehrana i redovna tjelesna aktivnost pomoći će pri održavanju Vašeg zdravlja.' + '<br />' + 'Zbog izrazito niskih vrijednosti navedenih parametara preporučuje se kontrola jetrenih proba (AST, ALT, GGT), željeza, feritina i bilirubina, jer unatoč svemu, imate povišen rizik od nastanka bolesti jetre.' + '<br />' + 'Kroz daljnju prehranu i životni stil trebali biste se usmjeriti na povećanje trenutne tjelesne težine i postotka tjelesne masti. Naši nutricionisti propisivanjem pravilne prehrane i suplementacije mogu Vas stručno i profesionalno voditi kroz taj proces na zdrav, individualan, prilagođen i Vama prihvatljiv način.' + '<br />' + 'Svi naši zaposlenici će Vas znati uputiti u daljnje korake. Dogovorite termin za vađenje krvi te besplatne konzultacije pozivom na broj 021 688 888 ili porukom na e-mail info@mcanaliza.org.' + '<br />' + 'Napomena: Za navedene pretrage potrebno je doći natašte.</span>';
            $('.ukupniRizikOpis').html('Opis ' + opisUkupniRizik);
        } else if (2 <= ifelseRizik && ifelseRizik <= 7) {
            opisUkupniRizik = '<span style="color:green;">Vaš rizik za nastanak kardiovaskularnih bolesti i dijabetesa tipa 2 je nizak. Pravilna prehrana i redovita tjelesna aktivnost pomoći će pri održavanju Vašeg zdravlja.' + '<br />' + 'Za održavanje postojećeg zdravstvenog stanja i sprječavanje nastanka navedenih bolesti jednom do dvaput godišnje kontrolirajte navedene parametre, a za sve dodatne informacije posavjetujte se s našim stručnjacima! Nazovite 021 688 888 ili pošaljite e-mail na info@mcanaliza.org i dogovorite svoj termin besplatnih konzultacija!' + '<br />' + 'U održavanju postojećeg zdravstvenog stanja mogu Vam pomoći neki od navedenih proizvoda:' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">&#8226; Udo&#39;s Oil Omega 3,6,9 Blend</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=153"><span style="color:blue;">&#8226; Fermented Papaya Preparation (Immun&#39;Age)</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active More DHA</span></a>' + '<br />' + '<span style="color:green;">Za savjetovanje o djelovanju i pravilnih primjeni ovih proizvoda posavjetujte se s našim stručnjacima na nutricionist@mcanaliza.org.</span>';
            $('.ukupniRizikOpis').html('Opis ' + opisUkupniRizik);
        } else if (8 <= ifelseRizik && ifelseRizik <= 13) {
            opisUkupniRizik = '<span style="color:#F9A825;">Vaš rizik za nastajanje kardiovaskularnih bolesti i dijabetesa tipa 2 je normalan. Pravilna prehrana i redovita tjelesna aktivnost pomoći će pri održavanju Vašeg zdravlja.' + '<br />' + 'Za održavanje postojećeg zdravstvenog stanja i smanjenja rizika za nastanak navedenih bolesti kontrolirajte navedene parametre u redovnim intervalima od 6 mjeseci. Za uvid u potpunu sliku potrebno je još napraviti nalaze: AST, ALT, GGT, HbA1c, urea, kreatinin, urat, konjugirani i nekonjugirani bilirubin, homocistein.' + '<br />' + 'Svijest o pravilnoj prehrani bitan je faktor u očuvanju dobrog zdravlja. Za savjete o provođenju pravilne prehrane i načinima na koji možete pridonijeti svome zdravlju besplatno se posavjetujte s našim nutricionistima. Oni će Vas znati uputiti u način na koji ćete moći odrediti koja je hrana za Vas dobra, a koja ne, odnosno koje namirnice biste trebali izbjegavati, a koje biste trebali jesti češće.' + '<br />' + 'Nazovite 021 688 888 ili pošaljite e-mail na info@mcanaliza.org i dogovorite svoj termin besplatnih konzultacija. U održavanju postojećeg zdravstvenog stanja mogu Vam pomoći neki od navedenih proizvoda:' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">&#8226; Udo&#39;s Oil Omega 3,6,9 Blend</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=153"><span style="color:blue;">&#8226; Fermented Papaya Preparation (Immun&#39;Age)</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active More DHA</span></a><span style="color:#F9A825;">'
            + '<br />' +
            '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active Memory</span></a>'
            + '<br />' +
            '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">&#8226; Salengei Active Cardisterol</span></a>'
            + '<br />' +
            'Za savjetovanje o djelovanju i pravilnih primjeni ovih proizvoda posavjetujte se s našim stručnjacima na nutricionist@mcanaliza.org.</span>';
            $('.ukupniRizikOpis').html('Opis ' + opisUkupniRizik);
        } else if (14 <= ifelseRizik && ifelseRizik <= 20) {
            opisUkupniRizik = '<span style="color:#F9A825;">Vaš rizik za nastajanje kardiovaskularnih bolesti i dijabetesa tipa 2 je blago povišen.' + '<br />' + 'Za uvid u potpunu sliku potrebno je još napraviti nalaze: AST, ALT, GGT, HbA1c, urea, kreatinin, urat, konjugirani i nekonjugirani bilirubin, homocistein te se potom javiti našim stručnjacima na interpretaciju!' + '<br />' + 'Svijest o pravilnoj prehrani bitan je faktor u očuvanju dobrog zdravlja. Za savjete o provođenju pravilne prehrane i načinima na koji možete pridonijeti svome zdravlju besplatno se posavjetujte s našim nutricionistima. Oni će Vas znati uputiti u način na koji ćete moći odrediti koja je hrana za Vas dobra, a koja ne, odnosno koje namirnice biste trebali  izbjegavati, a koje biste trebali jesti češće.' + '<br />' + 'Nazovite 021 688 888 ili pošaljite e-mail na info@mcanaliza.org i dogovorite svoj termin besplatnih konzultacija.' + '<br />' + 'U održavanju postojećeg zdravstvenog stanja mogu Vam pomoći neki od navedenih proizvoda:' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">&#8226; Udo&#39;s Oil Omega 3,6,9 Blend</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=153"><span style="color:blue;">&#8226; Fermented Papaya Preparation (Immun&#39;Age)</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active More DHA</span></a>'
            + '<br />' +
            '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active Memory</span></a>' + '<br />' +
            '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">&#8226; Salengei Active Cardisterol</span></a>' + '<br />' + '<span style="color:#F9A825;">  Za savjetovanje o djelovanju i pravilnih primjeni ovih proizvoda posavjetujte se s našim stručnjacima na nutricionist@mcanaliza.org ili rezervirajte termin besplatnih konzultacija.</span>';
            $('.ukupniRizikOpis').html('Opis ' + opisUkupniRizik);
        } else if (20 <= ifelseRizik && ifelseRizik <= 27) {
            opisUkupniRizik = '<span style="color:tomato;">Vaš rizik za nastajanje kardiovaskularnih bolesti i dijabetesa tipa 2 je visok!' + '<br />' + 'Vaše stanje zahtjeva djelovanje! Promjena životnog stila je nužna! Vaši rezultati pokazuju sklonost od nastanka metaboličkog sindroma – skupa metaboličkih poremećaja koji se manifestiraju visokim razinama glukoze, triglicerida i kolesterola u krvi, povišenim krvnim tlakom i nakupljanjem masnoga tkiva na području trbuha.' + '<br />' + 'Metabolički sindrom gotovo uvijek vodi ka nastanku bolesti poput dijabetesa tipa 2 te bolesti srca i krvnih žila. Metabolički sindrom najčešće je rezultat pogrešnog načina života (nedostatak tjelesne aktivnosti i sna, stres) i nepravilna i neredovite prehrane. Nepravilnu prehranu karakteriziraju rijetki obilni obroci, unos velike količine rafiniranih ugljikohidrata, trans-masti i zasićenih masnih kiselina, te pogrešan odabir unešene tekućine. Godine ovakvog života dovode do poremećaja rada gušterače i djelovanja inzulina te se razvija dijabetes tipa 2 i inzulinska rezistencija. Također dolazi do nakupljanja trans-masti i zasićenih masnih kiselina radi čega se javljaju ateroskleroza i povišen krvni tlak.' + '<br />' + 'Za uvid u potpunu sliku potrebno je još napraviti nalaze: AST, ALT, GGT, HbA1c, urea, kreatinin, urat, konjugirani i nekonjugirani bilirubin, homocistein te se potom javiti našim stručnjacima na interpretaciju!' + '<br />' + 'Promjena prehrane predstavlja jedino rješenje za metabolički sindrom! Pravilan raspored obroka i odabir namirnica, smanjen unos soli i povišen unos tekućine, dovode do znatnog poboljšanja simptoma!' + '<br />' + 'Dopustite našim nutricionistima da Vam pomognu u reguliranju prehrane i redukciji simptoma! Dogovorite besplatne konzultacije odmah pozivom na broj 021 688 888 ili porukom na info@mcanaliza.org' + '<br />' + 'Kao potpora u prevenciji metaboličkog sindroma mogu Vam pomoći neki od navedenih proizvoda, a koje će Vam naši djelatnici rado preporučiti:' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">&#8226; Udo&#39;s Oil Omega 3,6,9 Blend</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=153"><span style="color:blue;">&#8226; Fermented Papaya Preparation (Immun&#39;Age)</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active More DHA</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active Memory</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">&#8226; Salengei Active Cardisterol</span></a><span style="color:tomato;"> Za savjetovanje o djelovanju i pravilnih primjeni ovih proizvoda posavjetujte se s našim stručnjacima na nutricionist@mcanaliza.org ili rezervirajte termin besplatnih konzultacija.</span>';
            $('.ukupniRizikOpis').html('Opis ' + opisUkupniRizik);
        } else {
            opisUkupniRizik = '<span style="color:tomato;">Vaš rizik za nastajanje kardiovaskularnih bolesti i dijabetesa tipa 2 je vrlo visok!' + '<br />' + 'Za Vaše stanje pod hitno je potrebno djelovanje! Vaši rezultati pokazuju postojanje metaboličkog sindroma - skupa metaboličkih poremećaja koji se manifestiraju visokim razinama glukoze, triglicerida i kolesterola u krvi, povišenim krvnim tlakom i nakupljanjem masnoga tkiva na području trbuha.' + '<br />' + 'Metabolički sindrom gotovo uvijek vodi ka nastanku bolesti poput dijabetesa tipa 2 te bolesti srca i krvnih žila Metabolički sindrom najčešće je rezultat pogrešnog načina života (nedostatak tjelesne aktivnosti i sna, stres) i nepravilna i neredovite prehrane. Nepravilnu prehranu karakteriziraju rijetki obilni obroci, unos velike količine rafiniranih ugljikohidrata, trans-masti i zasićenih masnih kiselina, te pogrešan odabir unešene tekućine.' + '<br />' + 'Metabolički sindrom razvija se godinama. Postepeno dolazi do poremećaja rada gušterače i djelovanja inzulina te se razvija dijabetes tipa 2 i inzulinska rezistencija. Također dolazi do nakupljanja trans-masti i zasićenih masnih kiselina radi čega se javljaju ateroskleroza i povišen krvni tlak.' + '<br />' + 'Visoke vrijednosti glukoze i niske vrijednosti inzulina pokazuju prvu fazu inzulinske rezistencije i skoru pojavu simptoma dijabetesa tipa 2, dok visoke vrijednosti kolesterola i triglicerida u krvi dovode do začepljenja krvnih žila.' + '<br />' + 'Prva faza razvoja metaboličkog sindroma je povišenje krvnog tlaka (hipertenzija), što se se događa zbog smanjene elastičnosti krvnih žila. Potom dolazi do suženja krvnih žila (ateroskleoza), što se događa zbog nakupljanja naslaga kolesterola i triglicerida na već krutim stijenkama krvnih žila. Potom, zbog unosa velikog broja rafiniranih ugljikohidrata, dolazi do inzulinske rezistencije, što rezultira debljanjem i nakupljanjem suvišne vode u organizmu. Pojavljuju se edemi na zglobovima, masno tkivo na području trbuha, nedostatak daha... Sve ovo, ukoliko se ne djeluje na vrijeme, može rezultirati srčanim ili moždanim udarom i preuranjenom srmrću!' + '<br />' + 'Za uvid u potpunu sliku potrebno je još napraviti nalaze: AST, ALT, GGT, HbA1c, urea, kreatinin, urat, konjugirani i nekonjugirani bilirubin, homocistein te se potom javiti našim stručnjacima na interpretaciju!' + '<br />' + 'Promjena prehrane predstavlja jedino rješenje za metabolički sindrom! Pravilan raspored obroka i odabir namirnica, smanjen unos soli i povišen unos tekućine, dovode do znatnog poboljšanja simptoma!' + '<br />' + 'Dopustite našim nutricionistima da Vam pomognu u reguliranju prehrane i redukciji simptoma! Dogovorite besplatne konzultacije odmah pozivom na broj 021 688 888 ili porukom na info@mcanaliza.org' + '<br />' + 'Kao potpora u prevenciji metaboličkog sindroma mogu Vam pomoći neki od navedenih proizvoda, a koje će Vam naši djelatnici rado preporučiti:' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=50"><span style="color:blue;">&#8226; Udo&#39;s Oil Omega 3,6,9 Blend</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=153"><span style="color:blue;">&#8226; Fermented Papaya Preparation (Immun&#39;Age)</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=103&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active More DHA</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei"><span style="color:blue;">&#8226; Salengei Active Memory</span></a>' + '<br />' + '<a href="http://www.life-platform.com/index.php?route=product/product&amp;product_id=99&amp;search=salengei&amp;limit=100"><span style="color:blue;">&#8226; Salengei Active Cardisterol</span></a>' + '<br />' + '<span style="color:tomato;">Za savjetovanje o djelovanju i pravilnih primjeni ovih proizvoda posavjetujte se s našim stručnjacima na nutricionist@mcanaliza.org ili rezervirajte termin besplatnih konzultacija.</span>';
            $('.ukupniRizikOpis').html('Opis ' + opisUkupniRizik);
        }

        if($('#inzulinId').val() == '' ) {
            $('#mailIfelseRizik').val('Za potpune rezultate potrebno unijeti sve parametre.');
            $('#mailOpisUkupniRizik').val('Za potpune rezultate potrebno unijeti sve parametre.');
        }

        if($('#struk').val() == '' ) {
            $('#mailIfelseRizik').val('Za potpune rezultate potrebno unijeti sve parametre.');
            $('#mailOpisUkupniRizik').val('Za potpune rezultate potrebno unijeti sve parametre.');
        }

        if($('#bokovi').val() == '' ) {
            $('#mailIfelseRizik').val('Za potpune rezultate potrebno unijeti sve parametre.');
            $('#mailOpisUkupniRizik').val('Za potpune rezultate potrebno unijeti sve parametre.');
        }

        if ($('#inzulinId').val() != '' && $('#struk').val() != '' && $('#bokovi').val() != '') {
            $('#mailIfelseRizik').val(ifelseRizik);
            $('#mailOpisUkupniRizik').val(opisUkupniRizik);
        }
    });
    
    // previous step
    $('.f1 .btn-danger').on('click', function() {
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');
        
        $(this).parents('fieldset').fadeOut(400, function() {
            // change icons
            current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
            // progress bar
            bar_progress(progress_line, 'left');
            // show previous step
            $(this).prev().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class( $('.f1'), 20 );
        });
    });
    
    // submit
    $('.f1').on('submit', function(e) {
        // fields validation
        $(this).find('input[type="text"], input[type="password"], textarea').each(function() {
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });
        // fields validation
    });


    $('#sendRiskData').on('click', function(e) {
        e.preventDefault();
        var mailTo = $('#email').val();

        if (validateEmail(mailTo)) {
            $('#mailTo').val(mailTo);
            var data = $('#riskDataForm').serialize();
            var url = "http://poliklinika-analiza.hr/calculator-send-mail.php";

            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "text/html",
                success: function(resultData) {
                    alert('Mail je poslan');
                }
            });    
        }
    });

    // validacija emaila
    function validateEmail(mail) {  
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {  
            $('.mailclass').removeClass('input-error');
            $('#mailUspjeh').css('color', 'green').html('Vaš email je uspješno poslan.');
            return (true)
        } else {
            $('.mailclass').addClass('input-error').attr("placeholder", "Unesite valjanu e-mail adresu!").val('');
        }

        return (false);
    }

    var ifelseRizik = calculateTotalRisk();

    $('.calculateKks, .calculateWhr').on('change', function() {
        if($('#inzulinId').val() == '' || $('#struk').val() == '' || $('#bokovi').val() == ''){
            $('.parametriRizik').hide();
            $('.faleParametri').html('<span style="color:tomato;">Opis ukupnog rizika nije moguće prikazati bez svih parametara.</span>');
        } else {
            $('.parametriRizik').show();
            $('.faleParametri').html('');
        }
    });
    $('.calculateKks, .calculateBmi').on('change', function() {
        if($('#inzulinId').val() == ''){
            $('.homaFaliInzulin').hide();
            $('.inzulinRezultat').html('<span style="font-weight: bold;">Inzulin: </span>' + '<span style="color:tomato;">Nedostaje parametar</span>');
        } else {
            $('.homaFaliInzulin').show();
        }
    });

    $('.calculateWhr, .calculateBmi').on('change', function() {
        if($('#struk').val() == '' || $('#bokovi').val() == ''){
            $('.parametriRizik').hide();
            $('.faleParametri').html('<span style="color:tomato;">Opis ukupnog rizika nije moguće prikazati bez svih parametara.</span>');
            $('#ukupniRizikBroj').hide();
        } else {
            $('.parametriRizik').show();
            $('.faleParametri').html('');
            $('#ukupniRizikBroj').show();
            }
    });
});