


const addRowsOverview = () => {
	const table = document.querySelector('table');
	//  fer last rows tr of table 
	const trs = table.querySelectorAll('tr');
	const lastTr = trs[trs.length - 1];

	// get first td of last tr
	const firstTd = lastTr.querySelector('td');
	// get colspan of first td
	const colspan = firstTd.getAttribute('colspan');

	if(colspan == null || colspan == undefined) {
		lastTr.insertAdjacentHTML("afterend", overviewHTML);
		return;
	}
}
var overviewHTML = `
<tr>

            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Điểm trung bình học kỳ hệ 10:<span> </span>
            </td>
            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Điểm trung bình học kỳ hệ 4:<span> </span>
            </td>
                    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td colspan="28"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
</tr>
<tr>

            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Điểm trung bình tích lũy:<span> </span>
            </td>
            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Điểm trung bình tích lũy (hệ 4):<span> </span>
            </td>
                    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td colspan="28"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
</tr>
<tr>

            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Tổng số tín chỉ đã đăng ký:<span> </span>
            </td>
            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Tổng số tín chỉ tích lũy:<span> </span>
            </td>
                    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td colspan="28"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
</tr>
<tr>

            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Tổng số tín chỉ đạt:<span> </span>
            </td>
            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Tổng số tín chỉ nợ tính đến hiện tại:<span> </span>
            </td>
                    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td colspan="28"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
</tr>
<tr>

            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Xếp loại học lực tích lũy:<span> </span>
            </td>
            <td colspan="2" class="" style="vertical-align:top !important; text-align:left !important; font-weight: ">
                <span class=""></span>Xếp loại học lực học kỳ:<span> </span>
            </td>
                    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td class="hidden"></td>
    <td colspan="28"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
</tr>
`;
