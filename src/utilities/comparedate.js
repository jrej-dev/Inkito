export const compareDate = (contentDate) => {
    var g1 = new Date().toISOString().substring(0, 10);
    var g2 = contentDate;
    if (g1 >= g2) {
        g1 = g1.split("-");
        g2 = g2.split("-");
        var g3 = [g1[0] - g2[0], g1[1] - g2[1], g1[2] - g2[2]]
        if (g3[0] > 0) {
            return g3[0] === 1 ? `${g3[0]} year ago` : `${g3[0]} years ago`;
        } else if (g3[1] > 0) {
            return g3[1] === 1 ? `${g3[1]} month ago` : `${g3[1]} months ago`;
        } else if (g3[2] > 0) {
            return g3[2] === 1 ? `${g3[2]} day ago` : `${g3[2]} days ago`;
        }
    }
}