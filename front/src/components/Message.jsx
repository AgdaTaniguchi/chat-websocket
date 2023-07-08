export default function Message(message) {
    const info = JSON.parse(message.message);

    return (
        <div className="mb-6">
            <div className="flex items-end">
                <h1 className='font-bold text-xl' style={{'color': info?.color}}>{info?.nickname}</h1>
                <span className="ml-4 text-sm text-zinc-500">{info?.time}</span>
            </div>
            <p>{info?.message}</p>
        </div>
    );
}