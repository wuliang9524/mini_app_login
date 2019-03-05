<?php

namespace addons\third\library;

use fast\Http;
use think\Config;
use EasyWeChat\MiniProgram\Encryption\Encryptor;

/**
 * 微信小程序
 */
class MiniWechat
{
    //https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    const GET_SESSION_BY_CODE_URL = "https://api.weixin.qq.com/sns/jscode2session";

    /**
     * 配置信息
     * @var array
     */
    private $config = [];

    public function __construct($options = [])
    {
        if ($config = Config::get('third.miniwechat')) {
            $this->config = array_merge($this->config, $config);
        }
        $this->config = array_merge($this->config, is_array($options) ? $options : []);
    }

    /**
     * 登录凭证校验
     *
     * @param string $code
     * @return array
     */
    protected function code2Session($code)
    {
        if (!empty($code)) {
            $params = [
                'appid' => $this->config['app_id'],
                'secret' => $this->config['app_secret'],
                'js_code' => $code,
                'grant_type' => 'authorization_code',
            ];
            $res = json_decode(Http::get(self::GET_SESSION_BY_CODE_URL, $params), true);

            return $res;
        }
        return [];
    }

    /**
     * 获取用户信息
     * @param array $params
     * @return array
     */
    public function getUserInfo($params = [])
    {
        $params = $params ? $params : $_POST;
        if (isset($params['code'])) {
            $res = $this->code2Session($params['code']);

            if (isset($res['errcode']) || isset($res['errmsg'])) {
                return [];
            }

            $data = [
                'access_token' => "",
                'refresh_token' => "",
                'openid' => $res['openid'],
                'session_key' => $res['session_key'],
                'expires_in' => $res['expires_in'],
                'unionid' => isset($res['unionid']) ? $res['unionid'] : '',
            ];

            return $data;
        }
        return [];
    }

    /**
     * 解密
     *
     * @param array $params
     * @return void
     */
    public function decryptData($params = [])
    {
        // $params = $params ? $params : $_POST;
        if(isset($params['encryptedData']) && isset($params['iv']) && isset($params['sessionKey'])){
            $encryptor = new Encryptor($this->config['app_id'], $this->config['app_secret'], false);
            $res = $encryptor->decryptData($params['sessionKey'], $params['iv'], $params['encryptedData']);

            if(!$res){
                return [];
            }

            $data = [
                'openid' => $res['openId'],
                'unionid' => isset($res['unionId']) ? $res['unionId'] : '',
                'openname' => $res['nickName'],
                'nickname' => $res['nickName'],
                'avatar' => $res['avatarUrl'],
                'gender' => $res['gender'],
                'city' => $res['city'],
                'province' => $res['province'],
                'country' => $res['country'],
                'appid' => isset($res['watermark']['appid']) ? $res['watermark']['appid'] : '',
                'watermark' => isset($res['watermark']) ? json_encode($res['watermark']) : '',
            ];

            return $data;
        }
        return [];
    }
}
