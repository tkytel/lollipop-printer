import { useAtom } from 'jotai';
import { payloadAtom } from '../helper/Jotai';

export default function Form() {
	const [payload, setPayload] = useAtom(payloadAtom);

	return (
		<div style={{ width: "100mm", marginInline: "auto" }}>
			<textarea
                name="payload"
                id="payload"
                style={{ fontFamily: 'monospace', height: '162.5mm', fontSize: '12pt' }}
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
            ></textarea>
		</div>
	);
}
