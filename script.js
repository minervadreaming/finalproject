$(document).ready(function() {
    //insert options into rep dropdown
    var select='';
    for(i=1;i<=12;i++) {
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $("select[name='reps']").html(select);

    //handle the calculate button
    //removed disabled class upon input of data in weight lifted input box, allow button to be pressed
    $("#weightInput").on('input', function() {
        var btn = $("#calcBtn");

        btn.removeClass("disabled");
        btn.prop("disabled", false);
    })

    //handle case where user enters and then clears input
    $("#weightInput").blur(function() {
        var inputVal = $(this).val();
        var btn = $("#calcBtn");

        if(inputVal === '') {
            btn.addClass("disabled");
            btn.prop("disabled", true);
            hidePerc();
            hideMovement()
            $("#1rm").html('');
        } else {
            btn.removeClass("disabled");
            btn.prop("disabled", false);
        }
    });

    //handle the actual calculations
    $("#calcBtn").click(function() {
        var lifted = parseInt($("#weightInput").val());
        var reps = parseInt($("select[name='reps']").val());
        var oneRepMax;

        if(reps === 1) { //because the Epley formula only handles greater than 1 rep
            oneRepMax = lifted;
        } else {
            //Calculate 1RM via the Epley formula
            oneRepMax = Math.round((lifted*(1+(reps/30))));
        }

        //insert 1RM number into the DOM to be displayed to the user
        $("#1rm").html(oneRepMax);

        //set percentages, round, then display them
        $("#perc95").val(Math.round(oneRepMax * .95));
        $("#perc90").val(Math.round(oneRepMax * .90));
        $("#perc85").val(Math.round(oneRepMax * .85));
        $("#perc80").val(Math.round(oneRepMax * .80));
        $("#perc75").val(Math.round(oneRepMax * .75));
        $("#perc70").val(Math.round(oneRepMax * .70));
        $("#perc65").val(Math.round(oneRepMax * .65));
        $("#perc60").val(Math.round(oneRepMax * .60));
        $("#perc55").val(Math.round(oneRepMax * .55));
        $("#perc50").val(Math.round(oneRepMax * .50));

        showPerc();

        //show or hide proper movement video based on selection
        var deadliftURL = 'https://www.youtube.com/embed/wYREQkVtvEc';
        var benchpressURL = 'https://www.youtube.com/embed/U-2CwAexfjw';
        var backsquatURL = 'https://www.youtube.com/embed/4b4_ZT0yB1I';
        var frontsquatURL = 'https://www.youtube.com/embed/HefPQH7pTms';
        var ohsquatURL = 'https://www.youtube.com/embed/F1smC539je4';
        var thrusterURL = 'https://www.youtube.com/embed/sWdo3dxgROI';
        var cleanURL = 'https://www.youtube.com/embed/DEZx3PmXU4c';
        var powercleanURL = 'https://www.youtube.com/embed/mPsxlNjv7Aw';
        var hangcleanURL = 'https://www.youtube.com/embed/uSXHo9E9sEA';
        var cjURL = 'https://www.youtube.com/embed/bX57OOxEd0g';
        var jerkURL = 'https://www.youtube.com/embed/Tgq_OtjarD8';
        var splitjerkURL = 'https://www.youtube.com/embed/ql9U4aHymhI';
        var pushpressURL = 'https://www.youtube.com/embed/sfLhrZVVYrA';
        var strictpressURL = 'https://www.youtube.com/embed/CnBmiBqp-AI';
        var pushjerkURL = 'https://www.youtube.com/embed/V1glInnOs7s';
        var powersnatchURL = 'https://www.youtube.com/embed/KODanFCbaJw';
        var squatsnatchURL = 'https://www.youtube.com/embed/2JiFUn2-dyQ';

        var mvmntSelect = $("select[name='movement']").val();

        if(mvmntSelect != '') {            
            if(mvmntSelect == 'Deadlift') {
                $("#movementFrame").prop('src', deadliftURL);
            } else if(mvmntSelect == 'Bench Press') {
                $("#movementFrame").prop('src', benchpressURL);
            } else if(mvmntSelect == 'Back Squat') {
                $("#movementFrame").prop('src', backsquatURL);
            } else if(mvmntSelect == 'Front Squat') {
                $("#movementFrame").prop('src', frontsquatURL);
            } else if(mvmntSelect == 'Overhead Squat') {
                $("#movementFrame").prop('src', ohsquatURL);
            } else if(mvmntSelect == 'Thruster') {
                $("#movementFrame").prop('src', thrusterURL);
            } else if(mvmntSelect == 'Clean') {
                $("#movementFrame").prop('src', cleanURL);
            } else if(mvmntSelect == 'Power Clean') {
                $("#movementFrame").prop('src', powercleanURL);
            } else if(mvmntSelect == 'Hang Clean') {
                $("#movementFrame").prop('src', hangcleanURL);
            } else if(mvmntSelect == 'Clean and Jerk') {
                $("#movementFrame").prop('src', cjURL);
            } else if(mvmntSelect == 'Jerk') {
                $("#movementFrame").prop('src', jerkURL);
            } else if(mvmntSelect == 'Split Jerk') {
                $("#movementFrame").prop('src', splitjerkURL);
            } else if(mvmntSelect == 'Push Press') {
                $("#movementFrame").prop('src', pushpressURL);
            } else if(mvmntSelect == 'Strict Press') {
                $("#movementFrame").prop('src', strictpressURL);
            } else if(mvmntSelect == 'Push Jerk') {
                $("#movementFrame").prop('src', pushjerkURL);
            } else if(mvmntSelect == 'Power Snatch') {
                $("#movementFrame").prop('src', powersnatchURL);
            } else if(mvmntSelect == 'Squat Snatch') {
                $("#movementFrame").prop('src', squatsnatchURL);
            }

            showMovement();
        }
    })
    
    //clear button functionality
    $("#clrBtn").click(function() {
        var btn = $("#calcBtn");

        $("#weightInput").val('');
        $("#movementPulldown").val('');
        btn.addClass("disabled");
        btn.prop("disabled", true);
        hidePerc();
        hideMovement();
        $("#1rm").html('');
    })

    //display the percentages readonly textboxes
    function showPerc() {
        $("#percContainer").removeClass("percHidden").addClass("percShown");
        $(".percRow").removeClass("percRowHide").addClass("percRowShow")
    };

    //hide the percentages textboxes if user clears weight lifted input and 
    function hidePerc() {
        $("#percContainer").removeClass("percShown").addClass("percHidden");
        $(".percRow").removeClass("percRowShow").addClass("percRowHide")
    };

    function showMovement() {
        $("#movementContainer").removeClass("mvmntHidden").addClass("mvmntShown");
    };

    function hideMovement() {
        $("#movementContainer").removeClass("mvmntShown").addClass("mvmntHidden");
        $("#movementFrame").prop('src', '') //clear out the URL sot he video disappears if the user clears out the weight lifted input box
    };

});