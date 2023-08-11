<footer class="pt-5 mt-5 border-top">
        <div class="container-xl mt-5">
            <p class="mt-5 text-center fs-2">Rights reserved</p>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/includes/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    <script src="/includes/js/app.js"></script>
    <?php if(isset($_POST['data'])): ?>
           <script> generatePie(keywordsPages)</script>
        <!-- <script src="/includes/js/charts.js"></script> -->
    <?php  else: ?>
        <script src="/includes/js/ignoreWordsList.js"></script>
    <?php endif; ?>
</body>
</html>