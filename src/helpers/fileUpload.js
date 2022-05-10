import Swal from 'sweetalert2';
import { setAbouth } from '../actions/abouth';
import { finishPercentUpload, startPercentUpload } from '../actions/ui';
import { storageRef } from '../Firebase/firebase-config';
// import { finishPercentUpload, startPercentUpload } from '../actions/ui';


const startAlert = (text,icon='error', title='Error') => {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

const startAlertLoading = () => { ///se ocupa
    Swal.fire({
        title: 'Uploading...',
        html: "Please wait while we upload and process the file!",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
}

export const fileLoad = (file, uid, route, dispatch, _callback) => {
    startAlertLoading();
    const upload = storageRef.child(`${route}/${uid}`).put(file);
    upload.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(startPercentUpload(progress));
    }, (error) => {
        startAlert(error.message);
    }, () => {
        dispatch(finishPercentUpload());
        upload.snapshot.ref.getDownloadURL()
        .then(Url => {
            return _callback(Url);
        }).catch(err => {
            startAlert(err.message);
        })
    })
}